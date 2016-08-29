/**
 * Created by amanjain on 24/08/16 at 7:47 PM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';
import Emoticon from './Emoticon';
import cx from 'classnames';

class EmoticonList extends Component {
    render() {
        const {props} = this,
            {EmoticonsMap, onClick,selectedEmoticonIndex} = props;

        return (
            <ul className={"emo-pop-wrap clearfix"}>
                {Object.keys(EmoticonsMap).map((emoticonIcon, iter) => {
                    return <li key={emoticonIcon} className={cx("emo-pop-wrap-item",{
                    selected : iter === selectedEmoticonIndex
                    })}>
                        <Emoticon
                            emoticonKey={`:${emoticonIcon}:`}
                            emoticonName={`:${emoticonIcon}:`}
                            emoticonIcon={emoticonIcon}
                            onClick={onClick}
                            {...props}
                        />
                    </li>
                })}
            </ul>
        );
    }
}

export default EmoticonList;
