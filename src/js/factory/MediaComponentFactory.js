/**
 * Created by amanjain on 07/08/16 at 3:36 AM.
 * Description :
 */

import Photo from '../components/media/Photo';
import IFrame from '../components/media/IFrame';
import Tweet from '../components/media/Tweet';
import Facebook from '../components/media/Facebook';
import Instagram from '../components/media/Instagram';
import MEDIA_TYPES from '../constants/mediaTypes'


const MEDIA_TYPE_COMPONENT_MAP = {
    [MEDIA_TYPES.PHOTO]: Photo,
    [MEDIA_TYPES.IFRAME]: IFrame,
    [MEDIA_TYPES.TWEET]: Tweet,
    [MEDIA_TYPES.FACEBOOK]: Facebook,
    [MEDIA_TYPES.INSTAGRAM]: Instagram
};

export default {
    getMediaComponent: function (type) {
        return MEDIA_TYPE_COMPONENT_MAP[type];
    }
}