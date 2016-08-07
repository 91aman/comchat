/**
 * Created by amanjain on 07/08/16 at 1:43 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';


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

const MessageTyping = ({usersTyping}) => (
    <div className="ml-userTyping"><i>{userTyping(usersTyping)}</i></div>
);

const mapStateToProps = (state) => {
    return {
        usersTyping: state.usersTyping || []
    }
};

export default connect(
    mapStateToProps,
    undefined
)(MessageTyping);