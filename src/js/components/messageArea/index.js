/**
 * Created by amanjain on 07/08/16 at 1:23 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import MessageAreaHeader from './MessageAreaHeader';
import MessageList from './MessageList';
import MessageTyping from './MessageTyping';
import ChatBox from '../chatBox';

import getMessageComponent from '../../factory/messageFactory';


class MessageForm extends Component {

    componentDidUpdate() {
        this.refs['messageList'] && (this.refs['messageList'].scrollTop = this.refs['messageList'].scrollHeight);
    }

    render() {
        return (
            <div className="messageForm">
                <MessageAreaHeader/>
                <MessageList/>
                <MessageTyping/>
                <footer className="ca-footer" autoComplete="off">
                    <ChatBox/>
                </footer>
            </div>
        )
    }

}

export default MessageForm;