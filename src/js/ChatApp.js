import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import TextField from 'material-ui/lib/TextField';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import ChatArea from './chatArea/ChatArea';

import {onUserLogin} from './actions';

import LoginForm from './login/Login' ;

var socket;

function getAppPaperStyles() {
    return this.props.state === 'USER_LOGGED_IN' ? {
        height: '80%',
        width: '80%',
        position: 'absolute',
        top: '10%',
        left: '10%',
        display: 'inline-block'
    } : {
        backgroundColor: '#F5F5F5',
        height: '450px',
        width: '30%',
        position: 'absolute',
        top: '10%',
        left: '35%',
        display: 'inline-block'
    }
}

function onKnockClick(username, channelName) {
    socket.emit('checkChannel', channelName);

    //socket.emit('login', {username, channelName});
}

const MessageDate = ({time}) => {
    const hours = time.getHours(),
        minutes = time.getMinutes(),
        meridiem = hours > 11 ? 'PM' : 'AM';

    return <span
        className="message-time">{hours > 12 ? hours - 12 : hours }:{minutes < 10 ? '0' + minutes : minutes } {meridiem}</span>
};

const SenderName = ({name, color}) => {
    return <span className="message-name" style={{color : '#' + color}}><b>{name}</b></span>
};

const Message = ({msg , time, username, color}) => {
    return (<div className="message">
        <MessageDate time={new Date(time)}/>
        <SenderName name={username} color={color}/>
        <span className="message-desc">{msg}</span>
    </div>)
};

const Info = ({msg, time}) => {

    return (<div className="message">
        <MessageDate time={new Date(time)}/>
        <span className="info-message-desc"><i>{msg}</i></span>
    </div>)
};

const MessageStartingInfo = () => {
    return <div>This is the very beginning of your message history in this chat. Start Typing...</div>
};

const userTyping = (usersTyping = []) => {
    const length = usersTyping.length;

    switch (length) {
        case 0 :
            return '';
        case 1:
            return usersTyping[0] + ' is typing...';
        default:
            return usersTyping.join(', ') + ' are typing...'
    }
};

class MessageForm extends Component {

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.refs['messageList'] && (this.refs['messageList'].scrollTop = this.refs['messageList'].scrollHeight);
    }

    render() {
        const {props : {messages, onSubmit, messageTyped, onMessageChange, usersTyping = []}} = this;
        return (
            <div className="messageForm">
                <div ref="messageList" className="messagesList">
                    {_.map(messages, ({type, data}) => {
                        return type === 'MESSAGE' ? <Message {...data}/> : <Info {...data}/>;
                    })}
                </div>
                <div className="ml-userTyping"><i>{userTyping(usersTyping)}</i></div>
                <footer className="ca-footer" autoComplete="off">
                    <form
                        onSubmit={onSubmit}>
                        <TextField
                            ref="text-field"
                            hintText="Type your message"
                            fullWidth={true}
                            onChange={onMessageChange}
                            value={messageTyped}
                            autoComplete="off"
                        />
                    </form>
                </footer>
            </div>
        )
    }
}

const User = ({username, color}) => {
    return (<li className="mas-user">
        <div>{username}</div>
        <div className="mas-user-icon" style={{background:'#'+color}}></div>
    </li>);
};

const SideBar = ({users = []}) => {
    return (<div className="ma-sidebar">
        <div className="ma-sidebar-label">Participants</div>
        <ul className="mas-user-list">
            {_.map(users, (user) => <User {...user}/>)}
        </ul>
    </div>)
};

const MessageArea = (props) => {
    return (
        <div className="messageArea">
            <SideBar {...props}/>
            <MessageForm {...props}/>
        </div>
    )
};

class ChatAppComponent extends Component {
    constructor(props) {
        super(props);

        socket = io();

        this.state = {
            messageTyped: "",
            messages: [],
            users: [],
            nickName: ''
        };

        socket.on('chat message', (message) => {
            const {state : {messages = []}} = this;
            messages.push({type: 'MESSAGE', data: message});
            this.setState({messages});
        });

        socket.on('userLoggedIn', ({time, user, users}) => {
            const {state : {messages = []}} = this;
            messages.push({type: 'INFO', data: {time, msg: user + ' has joined.'}});
            this.setState({messages, users});
        });

        socket.on('userLoggedOut', ({time, user, users}) => {
            const {state : {messages = []}} = this;
            messages.push({type: 'INFO', data: {time, msg: user + ' has left.'}});
            this.setState({messages, users});
        });

        socket.on('userTyping', ({usersTyping}) => {
            this.setState({usersTyping})
        });

        socket.on('loggedin', () => {
            this.props.onUserLoggedIn();
        });

        socket.on('channelCreated', () => {
            this.props.onUserLoggedIn();
        })
    }


    render() {
        const that = this,
            {state : {nickName,users,messageTyped, messages = [], usersTyping, channelName}} = that;

        return (
            <div className="chatApp">
                <Paper style={getAppPaperStyles.call(that)} zDepth={3}>
                    {this.props.state !== 'USER_LOGGED_IN' ? <LoginForm onKnockClick={onKnockClick}/> : <ChatArea/>}
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channelName: state.channelName,
        username: state.username,
        disableChannelName: state.disableChannelName,
        state: state.state
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedIn: () => {
            dispatch(onUserLogin())
        }
    }
};

const ChatApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatAppComponent);

export default ChatApp;


