/**
 * Created by amanjain on 02/08/16 at 2:02 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ClassNames  from 'classnames';

import Popover from 'material-ui/lib/popover/popover';

import Emoticon from './Emoticon';
import EmoticonsList from './EmoticonList';

import {toggleEmoticonPopover, onEmoticonClick} from '../../actions';
import {EmoticonsGroup, EmoticonGroupDetails} from '../../constants/emoticons';
import styles from './emoticon.scss';
import AppUtils from '../../utils/appUtils';
import Halogen from 'halogen';


const EmoticonGroupList = ({selectedEmoticonGroup, onSelect, minified}) => {

    return (<ul className={"emo-pop-list-wrap clearfix"}>
        {
            Object.keys(EmoticonsGroup).map((emoticonGroupKey) => {
                const emoticonGroup = EmoticonsGroup[emoticonGroupKey];
                return <li key={emoticonGroupKey} className="lfloat">
                    <Emoticon
                        onClick={onSelect}
                        selected={selectedEmoticonGroup === emoticonGroupKey}
                        emoticonName={emoticonGroup.groupName}
                        emoticonKey={emoticonGroupKey}
                        emoticonIcon={emoticonGroup.groupEmoticon}
                        minified={minified}
                    /></li>
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
                <div className="emo-pop">
                    {needLoading ?
                        <Halogen.SyncLoader className="emo-pop-loader" color="#4DAF7C"/> :
                        <EmoticonsList
                            minified={true}
                            onClick={(key) => {onEmoticonClick(key); closeEmoticonPopover()}}
                            EmoticonsMap={EmoticonGroupDetails[selectedEmoticonGroup]}
                        />
                    }

                    <EmoticonGroupList
                        minified={true}
                        onSelect={(key) => { that.setState({selectedEmoticonGroup : key})}}
                        selectedEmoticonGroup={selectedEmoticonGroup}/>
                </div>
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
