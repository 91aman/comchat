var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 5000;

app.get('/build/app.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/../../build/app.js'));
});

app.get('/src/*', function (req, res) {
    console.log(__dirname + '/../../'+req.originalUrl);
    res.sendFile(path.join(__dirname + '/../../'+ req.originalUrl));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../../index.html'));
});

http.listen(port, function () {
    console.log('listening on *:2000');
});

var users = {};
var userTyping = {};
var ChannelNames = {};

var colors = ['FF1744', 'FF1744', 'D500F9', '651FFF', '3D5AFE', '2979FF', '00B0FF', '00E5FF', '1DE9B6', '00E676', 'FFC400', 'FF9100', 'FF3D00'];

var randomColor = function () {
    return colors[Math.floor(Math.random() * (colors.length - 1)) + 1]
};

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

var makeNewConnection = function (channelName) {
    var nsp = io.of('/' + channelName);

    nsp.on('connection', function (socket) {

        socket.on('login', function (username) {

            var id = getRandomId(),
                newUser = new User({
                    user: username,
                    socket: socket,
                    color: randomColor()
                });

            if (!ChannelNames[channelName]['users']) {
                ChannelNames[channelName]['users'] = {}
            }

            ChannelNames[channelName]['users'][id] = newUser;

            nsp.emit('userLoggedIn', {time: +new Date(), user: username, users: getUsers(channelName)});
            socket.emit('userTyping', {usersTyping: getTypingUsers(channelName)});

            socket.on('disconnect', function () {
                delete ChannelNames[channelName]['users'][id];

                newUser.typing = false;
                nsp.emit('userTyping', {usersTyping: getTypingUsers(channelName)});
                nsp.emit('userLoggedOut', {time: +new Date(), user: username, users: getUsers(channelName)});
            });

            socket.on('typing', function (typing) {
                newUser.typing = typing;
                nsp.emit('userTyping', {usersTyping: getTypingUsers(channelName)});
            });

            socket.on('chat message', function (msg) {
                newUser.typing = false;
                nsp.emit('userTyping', {usersTyping: getTypingUsers(channelName)});
                nsp.emit('chat message', {username, msg, color: newUser.color, time: +new Date()});
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