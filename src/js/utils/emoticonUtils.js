/**
 * Created by amanjain on 24/08/16 at 4:34 PM.
 * Description :
 */

import {EmoticonGroupDetails} from '../constants/emoticons';
import _ from 'lodash';

let EmoticonObject = {};

(function () {
    Object.keys(EmoticonGroupDetails).forEach((emoticonGroupKey) => {
        const EmoticonGroupDetail = EmoticonGroupDetails[emoticonGroupKey];
        Object.keys(EmoticonGroupDetail).forEach((emoticonKey) => {
            const emoticonDetails = EmoticonGroupDetail[emoticonKey],
                alternateNames = emoticonDetails['alternate-name'] || [];

            EmoticonObject[emoticonKey] = emoticonDetails;

            if (alternateNames.length && alternateNames[0]) {
                alternateNames.forEach((alterName) => {
                    EmoticonObject[alterName] = emoticonDetails;
                })
            }
        });
    });
})();

export default {
    getMatchedEmoticons: function (keyword = '', length = 25) {
        const retObj = {};

        _.forEach(EmoticonObject, (object, key) => {
            if (key.indexOf(keyword) === 0) {
                retObj[object.name] = object;
                length--;
            }

            if (!length) {
                return false;
            }
        });

        return retObj;
    },

    hasMatchingEmotions : function(keyword){
        return Object.keys(this.getMatchedEmoticons(keyword, 1)).length;

    }
}