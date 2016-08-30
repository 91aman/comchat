/**
 * Created by amanjain on 07/08/16 at 1:06 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';

export default ({username, color}) => {
    return (<li className="mas-user">
        <div className="mas-user-profilePic" style={{background:'#'+color}}>{username[0]}</div>
        <div>{username}</div>
        <div className="mas-user-status"></div>
    </li>);
};