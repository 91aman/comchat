/**
 * Created by amanjain on 04/08/16 at 12:42 PM.
 * Description :
 */

import Autolinker from 'autolinker' ;
import _ from 'lodash';

//const autolinker = new Autolinker({
//    urls: {
//        schemeMatches: true,
//        wwwMatches: true,
//        tldMatches: true
//    },
//    email: true,
//    phone: false,
//    twitter: true,
//    hashtag: 'twitter',
//
//    stripPrefix: true,
//    newWindow: true,
//
//    truncate: {
//        length: 0,
//        location: 'end'
//    },
//
//    className: 'md-link'
//});


const IMAGE_REGEX = /((?:https?\:\/\/)(?:[a-zA-Z]{1}(?:[\w\-]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png))(?:\?\w+=\w+(?:&\w+=\w+)*)?)/;
const VIDEO_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

const getEmogifiedMsg = (msg) => {
    return window.emojify.getEmogifiedString(msg);
};

const getLinkifyMsg = (msg) => {
    return Autolinker.link(msg, {
        urls: {
            schemeMatches: true,
            wwwMatches: true,
            tldMatches: true
        },
        email: true,
        phone: false,
        twitter: true,
        hashtag: 'twitter',

        stripPrefix: false,
        newWindow: true,

        truncate: {
            length: 0,
            location: 'end'
        },

        className: 'md-link'
    });
};

const getImageDetails = (msg) => {
    const matches = IMAGE_REGEX.exec(msg);

    return matches ? {
        type: 'PHOTO',
        url: matches[0]
    } : undefined;

};

const getVideoDetails = (msg) => {
    const matches = VIDEO_REGEX.exec(msg);

    return matches ? {
        type: 'VIDEO',
        url: `https://www.youtube.com/embed/${matches[1]}`
    } : undefined;
};

export default {
    parseMessage: function (msg) {
        var emogifiedMsg = getEmogifiedMsg(msg);

        const mediaDetails = getImageDetails(emogifiedMsg) || getVideoDetails(emogifiedMsg);

        return {text: getLinkifyMsg(emogifiedMsg), mediaDetails};
    }
}