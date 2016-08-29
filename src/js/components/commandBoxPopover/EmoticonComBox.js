/**
 * Created by amanjain on 25/08/16 at 11:46 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import EmoticonUtils from '../../utils/emoticonUtils';
import EmoticonList from '../emoticonPopover/EmoticonList';
import Mousetrap from 'mousetrap';
import CmdPopoverHeader from './CmdPopoverHeader';
import {INPUT_MSG_EMOTICON_REGEX} from '../../utils/messageUtils';
import {
    toggleCommandBoxPopover,
    onMessageChange
} from '../../actions';

let MatchedEmoticons;

class EmoticonComBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedEmoticonIndex: 0
        }
    }

    onEmoticonSelect(key) {
        const {message} = this.props,
            matches = INPUT_MSG_EMOTICON_REGEX.exec(message);

        this.props.onMessageChange(message.replace(`:${matches[1]}`, key));
        this.props.closeCommandBoxPopover();
    };

    render() {
        const {message} = this.props,
            {selectedEmoticonIndex} = this.state,
            matches = INPUT_MSG_EMOTICON_REGEX.exec(message);

        MatchedEmoticons = EmoticonUtils.getMatchedEmoticons(matches && matches[1]);

        return (
            <div>
                <CmdPopoverHeader
                    text={`Emoticons matching ':${matches && matches[1]}'`}
                />
                <div className="cmdPop-emoticonList">
                    <EmoticonList
                        EmoticonsMap={EmoticonUtils.getMatchedEmoticons(matches && matches[1]) }
                        selectedEmoticonIndex={selectedEmoticonIndex}
                        onClick={(key) => {this.onEmoticonSelect(key)}}
                    />
                </div>
            </div>
        );

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message != this.props.message) {
            this.setState({
                selectedEmoticonIndex: 0
            })
        }
    }

    componentDidUpdate() {
        this.props.onPopOverComponentChange();
    }

    componentDidMount() {
        Mousetrap.bind(['up', 'down', 'left', 'right', 'enter', 'esc', 'tab'], (e, code) => {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                // internet explorer
                e.returnValue = false;
            }

            let selectedEmoticonIndex = this.state.selectedEmoticonIndex,
                {message} = this.props,
                matchedEmoticonArray = Object.keys(MatchedEmoticons || {}),
                matchedEmoticonsLength = matchedEmoticonArray.length;

            switch (code) {
                case 'up':
                case 'left':
                    selectedEmoticonIndex -= 1;
                    selectedEmoticonIndex < 0 && (selectedEmoticonIndex += matchedEmoticonsLength);
                    break;
                case 'down':
                case 'right':
                case 'tab':
                    selectedEmoticonIndex += 1;
                    selectedEmoticonIndex > matchedEmoticonsLength - 1 && (selectedEmoticonIndex -= matchedEmoticonsLength);
                    break;
                case 'enter':
                    let matches = INPUT_MSG_EMOTICON_REGEX.exec(message),
                        emoticonSelected = matchedEmoticonArray[selectedEmoticonIndex];

                    this.onEmoticonSelect(`:${emoticonSelected}:`);
                    break;
                case 'esc':
                    this.props.closeCommandBoxPopover();
            }

            this.setState({
                selectedEmoticonIndex
            })
        });
    }

    componentWillUnmount() {
        Mousetrap.unbind(['up', 'down', 'left', 'right', 'enter', 'esc']);
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message || ''
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMessageChange: (message) => {
            dispatch(onMessageChange(message))
        },
        closeCommandBoxPopover: (open) => {
            dispatch(toggleCommandBoxPopover({popoverType: false}));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmoticonComBox);
