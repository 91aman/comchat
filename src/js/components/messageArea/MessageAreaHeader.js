/**
 * Created by amanjain on 31/07/16 at 6:08 PM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import LinkIcon from 'material-ui/lib/svg-icons/content/link';
import NotificationIcon from 'material-ui/lib/svg-icons/social/notifications';
import NotificationOffIcon from 'material-ui/lib/svg-icons/social/notifications-off';
import IconButton from 'material-ui/lib/icon-button';

import {toggleSnackbar, toggleNotification} from '../../actions'


function copyTextToClipboard() {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = `http://www.comchat.io${window.location.pathname}`;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
    } catch (err) {
    }

    document.body.removeChild(textArea);
}


const ChatAreaHeaderComponent = ({channelName, showSnackbar, disableNotification, toggleNotification}) => (
    <div className="ml-g-header spr">
        <div className="ml-g-h-label vert-center">{channelName}</div>
        <IconButton
            className="ml-g-h-icon"
            title="Copy Link"
            onClick={() => {copyTextToClipboard() ; showSnackbar()}}
        >
            <LinkIcon />
        </IconButton>
        <IconButton
            className="ml-g-h-icon "
            title={disableNotification ? 'Enable Notification' : 'Disable Notification'}
            onClick={toggleNotification}
        >
            {disableNotification ? <NotificationOffIcon/> : <NotificationIcon />}
        </IconButton>
    </div>

);

const mapStateToProps = (state) => {
    return {
        channelName: state.channelName,
        disableNotification: state.disableNotification
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showSnackbar: () => {
            dispatch(toggleSnackbar(true))
        },
        toggleNotification: () => {
            dispatch(toggleNotification())
        }
    }
};

const ChatAreaHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatAreaHeaderComponent);

export default ChatAreaHeader;

