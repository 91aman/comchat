/**
 * Created by amanjain on 15/08/16 at 7:07 PM.
 * Description :
 */

import ChatIcon from 'material-ui/lib/svg-icons/communication/chat';
import ForumIcon from 'material-ui/lib/svg-icons/communication/forum';
import GroupIcon from 'material-ui/lib/svg-icons/social/group';
import UserIcon from 'material-ui/lib/svg-icons/social/person';
import TimeIcon from 'material-ui/lib/svg-icons/device/access-time';

export default {
    totalGroups: {
        IconComp: ForumIcon,
        label: 'Groups Created.'
    },
    totalUsers: {
        IconComp: GroupIcon,
        label: 'Users.'
    },
    totalMessages: {
        IconComp: ChatIcon,
        label: 'Messages Shared.'
    },
    totalUsersOnline: {
        IconComp: TimeIcon,
        label: 'Users Online.'
    }
}