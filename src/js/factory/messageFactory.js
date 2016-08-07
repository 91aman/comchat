/**
 * Created by amanjain on 07/08/16 at 1:31 AM.
 * Description :
 */

import Message from '../components/message';
import Info from '../components/message/InfoMessage'

export default {
    getMessageComponent: function (type) {
        return type === 'INFO' ? Info : Message;
    }
}