/**
 * Created by amanjain on 30/07/16 at 6:43 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {onStateChange, onNewMessageRecieved} from '../../actions';
import AppUtils from '../../utils/appUtils';

import SideBar from '../sidebar';
import MessageArea from '../messageArea';

var nameSpaceSocket;

class ChatRoomComponent extends Component {

    constructor(props) {
        super(props);

        const that = this,
            {username} = props,
            color = AppUtils.getRandomColor();

        nameSpaceSocket = io("/" + props.channelName);

        nameSpaceSocket.emit('login', {username, color});

        nameSpaceSocket.on('userLoggedIn', ({time, user, users}) => {
            const {messages = []} = this.props;

            that.props.onStateChange({messages : [...messages, {type: 'INFO', data: {time, msg: user + ' has joined.'}}], users});
        });

        nameSpaceSocket.on('userLoggedOut', ({time, user, users}) => {
            const {messages = []} = this.props;
           // messages.push({type: 'INFO', data: {time, msg: user + ' has left.'}});
            that.props.onStateChange({messages : [...messages, {type: 'INFO', data: {time, msg: user + ' has left.'}}], users});
        });

        nameSpaceSocket.on('userTyping', ({usersTyping}) => {
            that.props.onStateChange({usersTyping});
        });

        nameSpaceSocket.on('chat message', (messageDetails) => {
            that.props.onNewMessageRecieve(messageDetails);
            !that.props.disableNotification && AppUtils.pushNotification.call(that, {title : messageDetails.username, body : messageDetails.message });
        });

        //todo :think of a better way
        window.nameSpaceSocket = nameSpaceSocket;

        props.onStateChange({color})
    }

    render() {
        return (
            <div className="messageArea">
                <SideBar />
                <MessageArea />
            </div>
        );
    }

    componentDidMount() {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        channelName: state.channelName,
        username: state.username,
        disableNotification: state.disableNotification,
        messages : state.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStateChange: (data) => {
            dispatch(onStateChange(data))
        },
        onNewMessageRecieve: (message) => {
            dispatch(onNewMessageRecieved(message));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatRoomComponent);


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
