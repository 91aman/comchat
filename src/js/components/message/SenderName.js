/**
 * Created by amanjain on 07/08/16 at 1:08 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';

const SenderName = ({name, color}) => (
    <span className="message-name" style={{color : '#' + color}}><b>{name}</b></span>
);

export default SenderName;