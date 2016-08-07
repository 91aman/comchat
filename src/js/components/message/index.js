/**
 * Created by amanjain on 07/08/16 at 1:10 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import MessageDate from './MessageDate';
import SenderName from './SenderName';
import mediaComponentFactory from '../../factory/mediaComponentFactory';

const Message = ({enrichedMessage : {text, mediaDetails} ={} , time, username, color}) => {
    const MediaComponent = mediaDetails && mediaComponentFactory.getMediaComponent(mediaDetails.type);

    return (<div className="message clearfix">
        <div className="lfloat m-time"><MessageDate time={new Date(time)}/></div>
        <div className="lfloat m-message">
            <SenderName name={username} color={color}/>
            <span className="message-desc" dangerouslySetInnerHTML={{__html: text}}></span>
            {
                MediaComponent && (<div className="m-ms-media"><MediaComponent {...mediaDetails}/></div>)
            }
        </div>
    </div>)
};

export default Message;