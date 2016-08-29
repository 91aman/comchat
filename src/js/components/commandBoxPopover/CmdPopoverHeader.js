/**
 * Created by amanjain on 30/08/16 at 12:02 AM.
 * Description :
 */

import React, {Component, PropTypes} from 'react';
import EnterIcon from 'material-ui/lib/svg-icons/hardware/keyboard-return';
import TabIcon from 'material-ui/lib/svg-icons/hardware/keyboard-tab';
import NavIcon from 'material-ui/lib/svg-icons/action/swap-horiz';

class CmdPopoverHeader extends Component {
    render() {
        return (
            <div className="cmdPopover-header">
                <div className="lfloat">{this.props.text}</div>
                <div className="rfloat">
                    <TabIcon className="lfloat" style={{
                    height:'16px',
                    width : '16px',
                    margin : '0 5px'
                    }}/>
                    <div className="lfloat">{'or'}</div>
                    <NavIcon className="lfloat" style={{
                    height:'16px',
                    width : '16px',
                    margin : '0 5px'
                    }}/>
                    <div className="lfloat">{'to Navigate'}</div>
                    <EnterIcon className="lfloat" style={{
                    height:'16px',
                    width : '16px',
                    margin : '0 5px 0 30px'
                    }}/>
                    <div className="lfloat">{'to Select'}</div>
                    <div className="lfloat" style={{
                    marginLeft : '30px'
                    }}>{'esc to Navigate'}</div>
                </div>
            </div>
        );
    }
}

export default CmdPopoverHeader;


