import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ClassName from 'classnames';

import Stats from '../js/components/stats';

//import 'whatwg-fetch';

import TextField from 'material-ui/lib/TextField';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import Snackbar from 'material-ui/lib/snackbar';

import {
    onUserLogin,
    toggleSnackbar,
    changeChannelName
} from './actions';

import LoginForm from './components/login' ;
import ChatArea from './components/chatArea';

var socket;

function get4DigitRandomNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
}

function onKnockClick(username, channelName = '') {
    if (!channelName.trim()) {
        channelName = `${username}-${get4DigitRandomNumber()}`;
        this.props.onChannelNameChange(channelName)
    }

    window.history.pushState("", "", `/${channelName}`);
    socket.emit('checkChannel', channelName);
}

class ChatAppComponent extends Component {

    constructor(props) {
        super(props);

        socket = io();

        socket.on('loggedin', () => {
            this.props.onUserLoggedIn();
        });

        socket.on('channelCreated', () => {
            this.props.onUserLoggedIn();
        })
    }

    render() {
        const that = this,
            { showSnackBar, closeSnackbar, state} = that.props,
            isLoggedIn = state === 'USER_LOGGED_IN';

        return (
            <div className="chatApp">
                <section className="chatApp-login-section">
                    <Paper className={ClassName("ca-main-paper", {chatBox : isLoggedIn})} zDepth={3}>
                        {isLoggedIn ? <ChatArea /> : <LoginForm onKnockClick={_.bind(onKnockClick, that)}/>}
                    </Paper>
                </section>
                {!isLoggedIn && <section className="chatApp-stats-section spr">
                    <Stats/>
                </section>}
                <Snackbar
                    open={showSnackBar}
                    message={`Chat link ( http://www.comchat.io${window.location.pathname} ) is copied to your clipboard`}
                    autoHideDuration={2000}
                    onRequestClose={closeSnackbar}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.state,
        showSnackBar: state.showSnackBar
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChannelNameChange: (channelName) => {
            dispatch(changeChannelName(channelName))
        },
        onUserLoggedIn: () => {
            dispatch(onUserLogin())
        },
        closeSnackbar: () => {
            dispatch(toggleSnackbar(false))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatAppComponent);