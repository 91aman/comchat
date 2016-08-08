/**
 * Created by amanjain on 07/08/16 at 3:36 AM.
 * Description :
 */

import Photo from '../components/media/Photo';
import IFrame from '../components/media/IFrame';

export default {
    getMediaComponent: function (type) {
        return type === 'PHOTO' ? Photo : IFrame;
    }
}