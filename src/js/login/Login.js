/**
 * Created by amanjain on 30/07/16 at 9:33 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/TextField';
import PersonIcon from 'material-ui/lib/svg-icons/social/person';
import {changeUsername, changeChannelName} from '../actions.js';

class LoginComponent extends Component {

    render() {
        const {props : {
            username,
            channelName,
            onKnockClick,
            onChannelNameChange,
            onUsernameChange,
            disableChannelName
            }} = this;

        return (
            <div>
                <Paper style={{
                        height: '100px',
                        width: '100px',
                        position: 'absolute',
                        top : '-50px',
                        left:'calc(50% - 50px)',
                        display: 'inline-block',
                        textAlign : 'center',
                        backgroundColor: '#009688'
                        }} circle={true} zDepth={1}>
                    <PersonIcon style={{
                        height:'60px',
                        width : '60px',
                        marginTop:'15px',
                        fill : '#fff'
                        }}/>
                </Paper>
                <form className="nick-wrap"
                      onSubmit={(e) => {onKnockClick(username, channelName); e.preventDefault();}}>
                    <TextField
                        hintText="Nickname"
                        floatingLabelText="Nickname"
                        fullWidth={true}
                        onChange={(e) => {onUsernameChange(e.target.value);}}
                        value={username}
                        autoComplete='off'
                    />

                    <TextField
                        hintText="Channel Name"
                        floatingLabelText="comchat.io/"
                        fullWidth={true}
                        onChange={ (e) => {onChannelNameChange(e.target.value);}}
                        value={channelName}
                        disabled={disableChannelName}
                        autoComplete='off'
                        errorText={disableChannelName ? `You are trying to access '${channelName}' channel. You do not need to change it.` : ""}
                        errorStyle={{
                              color : '#81C784'
                        }}
                    />

                    <RaisedButton
                        style={{marginTop:"25px"}}
                        label="Knock"
                        fullWidth={true}
                        primary={true}
                        onClick={() => {onKnockClick(username, channelName)}}
                        disabled={!username}
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channelName: state.channelName,
        username: state.username,
        disableChannelName: state.disableChannelName
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChannelNameChange: (channelName) => {
            dispatch(changeChannelName(channelName))
        },
        onUsernameChange: (username) => {
            dispatch(changeUsername(username))
        }
    }
};

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);

export default Login;
