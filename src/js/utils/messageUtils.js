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

export default {
    parseMessage: function (msg) {
        var emogifiedMsg = getEmogifiedMsg(msg);
        return getLinkifyMsg(emogifiedMsg);
    }
}