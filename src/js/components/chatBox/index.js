/**
 * Created by amanjain on 07/08/16 at 1:46 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/lib/TextField';
import IconButton from 'material-ui/lib/icon-button';
import EmotionIcon from 'material-ui/lib/svg-icons/editor/insert-emoticon';
import EmoticonPopOver from '../emoticonPopover';

import MessageUtils from '../../utils/messageUtils';

import {
    onMessageChange,
    onNewMessageRecieved,
    toggleEmoticonPopover
} from '../../actions';

function onSubmit(e) {

    e.preventDefault();
    const that = this,
        {message = '', onMessageChange, username, color, onNewMessageRecieve } = that.props;

    if (!!message.trim()) {
        const enrichedMessage = MessageUtils.parseMessage(message),
            messageDetails = {
                username,
                color,
                time: +new Date(),
                enrichedMessage,
                message
            };

        window.nameSpaceSocket.emit('chat message', messageDetails);

        onNewMessageRecieve(messageDetails);
        onMessageChange('');
    }
}

function onUserMessageChange(e) {
    const that = this,
        currentTyping = !!e.target.value;

    that.props.onMessageChange(e.target.value);

    if (that.typing !== currentTyping) {
        window.nameSpaceSocket.emit('typing', currentTyping);
    }

    that.typing = currentTyping;
}

class ChatBox extends Component {
    render() {
        const {openEmoticonPopover, message} = this.props;
        return (
            <form
                onSubmit={_.bind(onSubmit, this)}>
                <TextField
                    className="ib-text"
                    hintText="Type your message"
                    fullWidth={true}
                    onChange={_.bind(onUserMessageChange, this)}
                    value={message}
                    autoComplete="off"
                />
                <IconButton
                    className="ib-em-bt"
                    onClick={(e ) => { openEmoticonPopover(true, e.currentTarget)}}
                >
                    <EmotionIcon className="ib-em-icon"/>
                </IconButton>
                <EmoticonPopOver/>
            </form>)
    }
}


const mapStateToProps = (state) => {
    return {
        message: state.message,
        username: state.username,
        color: state.color
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMessageChange: (message) => {
            dispatch(onMessageChange(message))
        },
        onNewMessageRecieve: (message) => {
            dispatch(onNewMessageRecieved(message));
        },
        openEmoticonPopover: (open, element) => {
            dispatch(toggleEmoticonPopover({open, element}));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatBox);
