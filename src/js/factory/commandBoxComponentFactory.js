/**
 * Created by amanjain on 25/08/16 at 11:51 AM.
 * Description :
 */


import COMMAND_POPOVER_TYPES from '../constants/commandPopoverTypes';

import EmoticonComBox from '../components/commandBoxPopover/EmoticonComBox';


const COMMAND_POPOVER_TYPE_COMPONENT_MAP = {
    [COMMAND_POPOVER_TYPES.EMOTICON]: EmoticonComBox
};

export default {
    getCommandPopoverComponent: function (type) {
        return COMMAND_POPOVER_TYPE_COMPONENT_MAP[type];
    }
}