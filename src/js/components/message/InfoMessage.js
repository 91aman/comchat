/**
 * Created by amanjain on 07/08/16 at 1:11 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import MessageDate from './MessageDate';

const Info = ({msg, time}) => {

    return (<div className="message clearfix">
        <div className="lfloat m-time"><MessageDate time={new Date(time)}/></div>
        <div className="lfloat m-message"><span className="info-message-desc"><i>{msg}</i></span></div>
    </div>)
};

export default Info;