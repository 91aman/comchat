/**
 * Created by amanjain on 30/07/16 at 9:46 AM.
 * Description :
 */

import {
    USERNAME_CHANGED,
    CHANNEL_NAME_CHANGED,
    USER_LOGGED_IN,
    USER_MESSAGE_CHANGE,
    ON_STATE_UPDATE,
    NEW_MESSAGE_RECIEVED,
    TOGGLE_SNACKBAR,
    ON_EMOTICON_ADD,
    TOGGLE_EMOTICON_POPOVER
} from './actions';


export default function reducer(state = {}, action) {

    switch (action.type) {
        //Loging
        case USERNAME_CHANGED:
            return Object.assign({}, state, {username: action.data});
        case CHANNEL_NAME_CHANGED:
            return Object.assign({}, state, {channelName: action.data});

        //chatApp
        case USER_LOGGED_IN:
            return Object.assign({}, state, {state: 'USER_LOGGED_IN', messages: [], users: []});
        case USER_MESSAGE_CHANGE:
            return Object.assign({}, state, {message: action.data});
        case ON_STATE_UPDATE:
            return Object.assign({}, state, action.data);
        case TOGGLE_SNACKBAR:
            return Object.assign({}, state, {showSnackBar: action.data});
        case TOGGLE_EMOTICON_POPOVER:
            return Object.assign({}, state, {emoticonPopoverDetails: action.data});
        case ON_EMOTICON_ADD:
            const message = state.message || '';
            return Object.assign({}, state, {message: `${message} ${action.data}`});
        case NEW_MESSAGE_RECIEVED:
            let messages = state.messages;
            messages = [...messages, {type: 'MESSAGE', data: action.data}];
            return Object.assign({}, state, {messages});
        default :
            return state
    }
}