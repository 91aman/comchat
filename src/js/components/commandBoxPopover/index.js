/**
 * Created by amanjain on 16/08/16 at 8:46 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Halogen from 'halogen';
import Popover from 'material-ui/lib/popover/popover';
import ComPopOverFactory from '../../factory/commandBoxComponentFactory';
import {
    toggleCommandBoxPopover
} from '../../actions';
import styles from './commanfBoxPopover.scss';

class CommandBox extends Component {
    render() {
        const {popoverType, anchorEl} = this.props,
            PopoverComponent = ComPopOverFactory.getCommandPopoverComponent(popoverType);
        return (
            <Popover
                ref="popover"
                className={"command-popover"}
                open={!!popoverType}
                anchorEl={anchorEl}
                canAutoPosition={true}
                style={{
                width:anchorEl ? anchorEl.clientWidth : '400px',
                height: 'auto'
                }}
                anchorOrigin={{horizontal:"left",vertical:"top"}}
                targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                onRequestClose={() => { this.props.closeCommandBoxPopover()}}
            >
                {/*<Halogen.SyncLoader className="emo-pop-loader" color="#4DAF7C"/>*/}
                {PopoverComponent && <PopoverComponent onPopOverComponentChange={() => this.refs['popover'].componentDidUpdate()}/>}
            </Popover>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        anchorEl: (state.commandBoxDetails || {}).element,
        popoverType: (state.commandBoxDetails || {}).popoverType
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeCommandBoxPopover: () => {
            dispatch(toggleCommandBoxPopover({popoverType: false}));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommandBox);

