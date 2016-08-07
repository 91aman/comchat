/**
 * Created by amanjain on 07/08/16 at 3:41 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';

const Video = ({url}) => <iframe width="560" height="315" src={url} frameborder="0" allowfullscreen/>;

export default Video;