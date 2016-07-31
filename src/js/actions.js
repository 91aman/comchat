/**
 * Created by amanjain on 30/07/16 at 10:17 AM.
 * Description :
 */


export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const CHANNEL_NAME_CHANGED = 'CHANNEL_NAME_CHANGED';
//chatApp
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_MESSAGE_CHANGE = 'USER_MESSAGE_CHANGE';
export const ON_STATE_UPDATE = 'ON_STATE_UPDATE';
export const NEW_MESSAGE_RECIEVED = 'NEW_MESSAGE_RECIEVED';

/*
 * action creators
 */

export function changeUsername(data) {
    return {type: USERNAME_CHANGED, data}
}

export function changeChannelName(data) {
    return {type: CHANNEL_NAME_CHANGED, data}
}

//chatApp
export function onUserLogin(data) {
    return {type: USER_LOGGED_IN, data}
}

export function onMessageChange(data) {
    return {type: USER_MESSAGE_CHANGE, data}
}

export function onStateChange(data) {
    return {type: ON_STATE_UPDATE, data}
}

export function onNewMessageRecieved(data) {
    return {type: NEW_MESSAGE_RECIEVED, data}
}

