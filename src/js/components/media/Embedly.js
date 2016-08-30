/**
 * Created by amanjain on 30/08/16 at 1:19 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';

function getWidth(url) {
    if (url.indexOf('jsfiddle') > -1 || url.indexOf('wikipedia') > -1) {
        return '450px';
    }

    return '400px';
}

class Embedly extends Component {
    render() {
        return (
            <a className="embedly-card"
               data-card-width={getWidth( this.props.url)}
               data-card-align="left"
               href={ this.props.url }/>
        );
    }
}

export default Embedly;
