/**
 * Created by amanjain on 07/08/16 at 3:41 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';


//todo :calculate dimensions acc to app dimentions
const DEFAULT_HEIGHT = 315;
const DEFAULT_WIDTH = 560;
const DIMENSION_SUB_TYPE_MAP = {
    SPOTIFY: {
        width: '300',
        height: '380'
    }
};

const IFrame = ({url, SUB_TYPE}) => {
    const dimensions = DIMENSION_SUB_TYPE_MAP[SUB_TYPE] || {};

    return (<iframe
        width={dimensions.width || DEFAULT_WIDTH}
        height={dimensions.height || DEFAULT_HEIGHT}
        src={url}
        frameborder="0"
        allowfullscreen
    />)
};

export default IFrame;