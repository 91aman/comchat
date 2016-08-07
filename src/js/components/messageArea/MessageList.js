/**
 * Created by amanjain on 07/08/16 at 1:36 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import MessageFactory from '../../factory/messageFactory';


class MessageList extends Component {

    componentDidUpdate() {
        this.refs['messageList'] && (this.refs['messageList'].scrollTop = this.refs['messageList'].scrollHeight);
    }

    render() {
        return (
            <ul
                ref="messageList"
                className="messagesList"
            >
                {this.props.messages.map(({type, data}) => {
                    const MessageComponent = MessageFactory.getMessageComponent(type);
                    return (<li>
                        <MessageComponent key={data.time} {...data}/>
                    </li>);
                })}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages || []
    }
};

export default connect(
    mapStateToProps,
    undefined
)(MessageList);


