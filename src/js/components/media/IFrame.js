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
    },
    VINE: {
        width: '300',
        height: '300'
    }
};

class IFrame extends Component {

    render() {
        const {url, SUB_TYPE} = this.props,
            {width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT} = DIMENSION_SUB_TYPE_MAP[SUB_TYPE] || {};

        return (<div className="spr" width={width} height={height}>
            <iframe
                onLoad={() => {console.log('loaded')}}
                width={width}
                height={height}
                src={url}
                frameborder="0"
                allowfullscreen
            />
        </div>)
    }
}

export default IFrame;