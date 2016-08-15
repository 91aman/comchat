var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

var port = process.env.PORT || 5000;

app.get('/build/app.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/../../build/app.js'));
});

app.get('/src/*', function (req, res) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname + '/../../' + req.originalUrl));
});

app.get('/api/usageStats', function (req, res) {
    connection.query('SELECT * FROM usageTable', function (err, rows, fields) {

        if (!err) {
            var Obj = {};
            rows.forEach(function (row) {
                Obj[row.usageCol] = row.value;
            });
            console.log('The solution is: ', Obj);
            res.json(Obj);
        } else {
            console.log('ERROR : error in /api/usageStats ' + err);
            res.json({});
        }
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../../index.html'));
});

http.listen(port, function () {
    console.log('listening on *:2000');
});

var connection;

function handleDisconnect() {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'usage_stats'
    });

    //connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL); // Recreate the connection, since
    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


var users = {};
var userTyping = {};
var ChannelNames = {};

var getRandomId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// User Model
var User = function (args) {
    var self = this;

    // Socket field
    self.socket = args.socket;
    // username field
    self.user = args.user;

    self.color = args.color;

    self.typing = args.typing;
};

var getUsers = function (channelName) {
    var usersList = [],
        users = ChannelNames[channelName]['users'];

    Object.keys(users).forEach(function (key) {
        var user = users[key];
        usersList.push({username: user.user, color: user.color})
    });

    return usersList;
};

var getTypingUsers = function (channelName) {
    var usersList = [],
        users = ChannelNames[channelName]['users'];

    Object.keys(users).forEach(function (key) {
        var user = users[key];

        user.typing && usersList.push(user.user);
    });

    return usersList;
};

var updateSQLTable = function (columnName, value) {
    connection.query("UPDATE usageTable SET value=value+" + value + " where usageCol='" + columnName + "'", function (err) {
        if (err) {
            console.log('ERROR : error while updating ' + columnName + err);
        }
    });
};

var increaseValueInSQLTable = function (columnName) {
    updateSQLTable(columnName, 1);
};

var decreaseValueInSQLTable = function (columnName) {
    updateSQLTable(columnName, -1);
};

var makeNewConnection = function (channelName) {
    var nsp = io.of('/' + channelName);

    increaseValueInSQLTable('totalGroups');

    nsp.on('connection', function (socket) {

        increaseValueInSQLTable('totalUsers');
        increaseValueInSQLTable('totalUsersOnline');

        socket.on('login', function (userDetails) {

            var id = getRandomId(),
                username = userDetails.username,
                newUser = new User({
                    user: username,
                    socket: socket,
                    color: userDetails.color
                });

            if (!ChannelNames[channelName]['users']) {
                ChannelNames[channelName]['users'] = {}
            }

            ChannelNames[channelName]['users'][id] = newUser;

            nsp.emit('userLoggedIn', {time: +new Date(), user: username, users: getUsers(channelName)});
            socket.emit('userTyping', {usersTyping: getTypingUsers(channelName)});

            socket.on('disconnect', function () {
                delete ChannelNames[channelName]['users'][id];
                decreaseValueInSQLTable('totalUsersOnline');

                newUser.typing = false;
                nsp.emit('userTyping', {usersTyping: getTypingUsers(channelName)});
                nsp.emit('userLoggedOut', {time: +new Date(), user: username, users: getUsers(channelName)});
            });

            socket.on('typing', function (typing) {
                newUser.typing = typing;
                nsp.emit('userTyping', {usersTyping: getTypingUsers(channelName)});
            });

            socket.on('chat message', function (msgDetails) {
                increaseValueInSQLTable('totalMessages');
                newUser.typing = false;
                nsp.emit('userTyping', {usersTyping: getTypingUsers(channelName)});
                socket.broadcast.emit('chat message', msgDetails);
            });
        });
    });

};

io.on('connection', function (socket) {

    socket.on('checkChannel', function (channelName) {
        if (!ChannelNames[channelName]) {
            makeNewConnection(channelName);
            ChannelNames[channelName] = {};
        }

        socket.emit('channelCreated');
    });
});

//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//
//var url = 'mongodb://localhost:27017/test';
//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log("Connected correctly to server.");
//    db.close();
//});


//connection.end();