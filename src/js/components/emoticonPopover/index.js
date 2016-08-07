/**
 * Created by amanjain on 02/08/16 at 2:02 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ClassNames  from 'classnames';

import Popover from 'material-ui/lib/popover/popover';

import {toggleEmoticonPopover, onEmoticonClick} from '../../actions';
import {EmoticonsGroup, EmoticonGroupDetails} from '../../constants/emoticons';
import styles from './emoticon.scss';
import AppUtils from '../../utils/appUtils';
import Halogen from 'halogen';


const Emoticon = ({dataKey,emoticonName, emoticonIcon,selected, onClick = () => {
}}) => {
    return (
        <li className={ClassNames("ep-emo-wrap", {selected})} title={emoticonName} onClick={() =>{onClick(dataKey)}}>
            <img src={`./src/img/emoticons/${emoticonIcon}.png`}/>
        </li>)
};


const EmoticonsList = ({selectedEmoticonGroup ,closeEmoticonPopover, onEmoticonClick}) => {
    const selectedEmoticons = EmoticonGroupDetails[selectedEmoticonGroup];

    return (<ul className={"emo-pop-wrap clearfix"}>
        {Object.keys(selectedEmoticons).map((emoticonIcon) => {
            return <Emoticon
                key={emoticonIcon}
                dataKey={`:${emoticonIcon}:` }
                emoticonIcon={emoticonIcon}
                emoticonName={`:${emoticonIcon}:` }
                onClick={(key) => {onEmoticonClick(key); closeEmoticonPopover()}}
            />
        })}
    </ul>)
};

const EmoticonGroupList = ({selectedEmoticonGroup, onSelect}) => {

    return (<ul className={"emo-pop-list-wrap clearfix"}>
        {
            Object.keys(EmoticonsGroup).map((emoticonGroupKey) => {
                const emoticonGroup = EmoticonsGroup[emoticonGroupKey];
                return <Emoticon
                    key={emoticonGroupKey}
                    dataKey={emoticonGroupKey}
                    onClick={onSelect}
                    selected={selectedEmoticonGroup === emoticonGroupKey}
                    emoticonName={emoticonGroup.groupName}
                    emoticonIcon={emoticonGroup.groupEmoticon}
                />
            })
        }
    </ul>)
};

function prefetchImages() {
    const that = this,
        {selectedEmoticonGroup, emoticonGroupLoaded = {}} = that.state,
        selectedEmoticons = EmoticonGroupDetails[selectedEmoticonGroup],

        imageSrcList = Object.keys(selectedEmoticons).map((emoticonIcon) => {
            return `./src/img/emoticons/${emoticonIcon}.png`;
        });

    AppUtils.preFetchImages(imageSrcList).then(() => {
        that.setState({emoticonGroupLoaded: Object.assign({}, emoticonGroupLoaded, {[selectedEmoticonGroup]: true})});
    })
};

class EmoticonPopoverComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedEmoticonGroup: Object.keys(EmoticonsGroup)[0],
            emoticonGroupLoaded: {}
        }
    }

    render() {
        const that = this,
            {selectedEmoticonGroup, emoticonGroupLoaded} = that.state,
            {closeEmoticonPopover, emoticonPopoverOpen, anchorEl, onEmoticonClick} = that.props,
            needLoading = !emoticonGroupLoaded[selectedEmoticonGroup];


        needLoading && prefetchImages.call(that);

        return (
            <Popover
                className={"emo-pop"}
                open={emoticonPopoverOpen}
                anchorEl={anchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                onRequestClose={() => {closeEmoticonPopover(false)}}
            >
                {needLoading ?
                    <Halogen.SyncLoader className="emo-pop-loader" color="#4DAF7C"/> :
                    <EmoticonsList onEmoticonClick={onEmoticonClick} selectedEmoticonGroup={selectedEmoticonGroup} closeEmoticonPopover={closeEmoticonPopover}/>
                }

                <EmoticonGroupList onSelect={(key) => { that.setState({selectedEmoticonGroup : key})}}
                                   selectedEmoticonGroup={selectedEmoticonGroup}/>

            </Popover>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        emoticonPopoverOpen: (state.emoticonPopoverDetails || {}).open,
        anchorEl: (state.emoticonPopoverDetails || {}).element
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeEmoticonPopover: (open, element) => {
            dispatch(toggleEmoticonPopover({open, element}));
        },
        onEmoticonClick: (key) => {
            dispatch(onEmoticonClick(key));
        }
    }
};

const EmoticonPopover = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmoticonPopoverComponent);

export default EmoticonPopover;
