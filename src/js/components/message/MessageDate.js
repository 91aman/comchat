/**
 * Created by amanjain on 07/08/16 at 1:07 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';

const MessageDate = ({time}) => {
    const hours = time.getHours(),
        minutes = time.getMinutes(),
        meridiem = hours > 11 ? 'PM' : 'AM';

    return <span
        className="message-time">{hours > 12 ? hours - 12 : hours }:{minutes < 10 ? '0' + minutes : minutes } {meridiem}</span>
};

export default MessageDate;