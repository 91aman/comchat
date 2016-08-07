/**
 * Created by amanjain on 07/08/16 at 1:06 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';

export default ({username, color}) => {
    return (<li className="mas-user">
        <div>{username}</div>
        <div className="mas-user-icon" style={{background:'#'+color}}></div>
    </li>);
};