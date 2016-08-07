/**
 * Created by amanjain on 07/08/16 at 1:13 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/lib/icon-button';
import ChatIcon from 'material-ui/lib/svg-icons/communication/chat';

import User from './User';

const SideBar = ({username,users = []}) => (<div className="ma-sidebar">
    <div className="ma-sb-username">
        <div className="lfloat">{username}</div>
        <a className="rfloat" href="http://comchat.io/" target="_blank">
            <IconButton className="ma-sb-icon" title="Start a new conversation">
                <ChatIcon />
            </IconButton></a>
    </div>
    <ul className="mas-user-list">
        {_.map(users, (user) => <User key={user.username} {...user}/>)}
    </ul>
</div>);

const mapStateToProps = (state) => {
    return {
        users: state.users,
        username: state.username
    }
};

export default connect(
    mapStateToProps,
    undefined
)(SideBar);