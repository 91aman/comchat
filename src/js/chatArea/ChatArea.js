/**
 * Created by amanjain on 30/07/16 at 6:43 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/TextField';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import RightIcon from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Divider from 'material-ui/lib/divider';
import LinkIcon from 'material-ui/lib/svg-icons/content/link';
import {onMessageChange, onStateChange, onNewMessageRecieved} from '../actions';

import ChatAreaHeader from './ChatAreaHeader';


var nameSpaceSocket;

const User = ({username, color}) => {
    return (<li className="mas-user">
        <div>{username}</div>
        <div className="mas-user-icon" style={{background:'#'+color}}></div>
    </li>);
};

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


const SideBar = ({username,users = []}) => {
    return (<div className="ma-sidebar">
        <div className="ma-sb-username">
            <div>{username}</div>
        </div>
        <ul className="mas-user-list">
            {_.map(users, (user) => <User {...user}/>)}
        </ul>
    </div>)
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

function onUserMessageChange(e) {
    const that = this,
        currentTyping = !!e.target.value;

    that.props.onMessageChange(e.target.value);

    if (this.typing !== currentTyping) {
        nameSpaceSocket.emit('typing', currentTyping);
    }

    this.typing = currentTyping;
}


function onSubmit(e) {
    const {message, onMessageChange } = this.props;
    nameSpaceSocket.emit('chat message', message);
    onMessageChange('');
    e.preventDefault();
}

class MessageForm extends Component {

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.refs['messageList'] && (this.refs['messageList'].scrollTop = this.refs['messageList'].scrollHeight);
    }

    render() {
        const {props} = this,
            {messages, message, usersTyping = []} = props;

        return (
            <div className="messageForm">
                <ChatAreaHeader {...props}/>
                <div ref="messageList" className="messagesList">
                    {_.map(messages, ({type, data}) => {
                        return type === 'MESSAGE' ? <Message {...data}/> : <Info {...data}/>;
                    })}
                </div>
                <div className="ml-userTyping"><i>{userTyping(usersTyping)}</i></div>
                <footer className="ca-footer" autoComplete="off">
                    <form
                        onSubmit={_.bind(onSubmit, this)}>
                        <TextField
                            ref="text-field"
                            hintText="Type your message"
                            fullWidth={true}
                            onChange={_.bind(onUserMessageChange, this)}
                            value={message}
                            autoComplete="off"
                        />
                    </form>
                </footer>
            </div>
        )
    }
}

class ChatRoomComponent extends Component {

    constructor(props) {
        super(props);

        const {channelName, username} = props;

        nameSpaceSocket = io("/" + channelName);

        nameSpaceSocket.emit('login', username);

        nameSpaceSocket.on('userLoggedIn', ({time, user, users}) => {
            const {messages = []} = this.props;
            messages.push({type: 'INFO', data: {time, msg: user + ' has joined.'}});
            this.props.onStateChange({messages, users});
        });

        nameSpaceSocket.on('userLoggedOut', ({time, user, users}) => {
            const {messages = []} = this.props;
            messages.push({type: 'INFO', data: {time, msg: user + ' has left.'}});
            this.props.onStateChange({messages, users});
        });

        nameSpaceSocket.on('userTyping', ({usersTyping}) => {
            this.props.onStateChange({usersTyping});
        });

        nameSpaceSocket.on('chat message', (message) => {
            this.props.onNewMessageRecieve(message);
        });
    }

    render() {
        return (
            <div className="messageArea">
                <SideBar {...this.props}/>
                <MessageForm {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channelName: state.channelName,
        username: state.username,
        users: state.users,
        messages: state.messages,
        usersTyping: state.usersTyping,
        message: state.message
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMessageChange: (message) => {
            dispatch(onMessageChange(message))
        },
        onStateChange: (data) => {
            dispatch(onStateChange(data))
        },
        onNewMessageRecieve: (message) => {
            dispatch(onNewMessageRecieved(message));
        }

    }
};

const ChatRoom = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatRoomComponent);

export default ChatRoom;


//<IconMenu
//    className="ml-g-h-icon"
//    iconButtonElement={<IconButton><LinkIcon /></IconButton>}
//    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
//    targetOrigin={{horizontal: 'left', vertical: 'top'}}
//>
//    <MenuItem primaryText="Copy Link"/>
//    <Divider/>
//    <MenuItem
//        primaryText="Share Link"
//        rightIcon={<RightIcon />}
//        menuItems={[
//                    <MenuItem primaryText="Facebook" />,
//                    <MenuItem primaryText="Twitter" />
//                ]}
//    />
//</IconMenu>
