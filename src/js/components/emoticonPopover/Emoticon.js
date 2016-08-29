/**
 * Created by amanjain on 24/08/16 at 7:11 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import ClassNames  from 'classnames';

class Emoticon extends Component {

    render() {
        const {selected, minified, emoticonKey, emoticonName, emoticonIcon, onClick = () => {
        }} = this.props;

        return (
            <div
                className={ClassNames("ep-emo-wrap clearfix", {selected, minified})}
                title={emoticonName}
                onClick={() =>{onClick(emoticonKey)}}
            >
                <img className="ep-emo-img" src={`./src/img/emoticons/${emoticonIcon}.png`}/>
                {!minified && <div className="ep-emo-text">{emoticonKey}</div>}
            </div>
        );
    }
}

export default Emoticon;
