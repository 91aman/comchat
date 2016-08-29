/**
 * Created by amanjain on 04/08/16 at 12:42 PM.
 * Description :
 */

import Autolinker from 'autolinker' ;
import _ from 'lodash';
import COMMAND_POPOVERS from '../constants/commandPopoverTypes';
import EmoticonUtils from './emoticonUtils';

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

/********************************************MSG FNS****************************************/

const IMAGE_REGEX = /((?:https?\:\/\/)(?:[a-zA-Z]{1}(?:[\w\-]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png))(?:\?\w+=\w+(?:&\w+=\w+)*)?)/;
const VIDEO_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
const SPOTIFY_REGEX = /(^spotify:|https:\/\/[a-z]+\.spotify\.com\/)([^\s]+)/;
const TWITTER_REGEX = /(^https?:\/\/twitter\.com\/(?:#!\/)?\w+\/status(es)?\/(\d+)$)/;
const FACEBOOK_REGEX = /((?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([^\/?]*)[^\s]+)/; //todo: find better
const FACEBOOK_VIDEO_REGEX = /^(https?:\/\/www\.facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+))$/; //todo: find better
const INSTAGRAM_REGEX = /(https?:\/\/?[\w\.]*instagram\.com\/[a-zA-Z0-9_-]*[^\s]+)/; //todo: find better
const VINE_REGEX = /(^https:\/\/vine.co\/v\/\w*$)/; //todo: find better

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
        type: 'IFRAME',
        SUB_TYPE: 'VIDEO',
        url: `https://www.youtube.com/embed/${matches[1]}`
    } : undefined;
};

const getSpotifyDetails = (msg) => {
    const matches = SPOTIFY_REGEX.exec(msg);

    return matches ? {
        type: 'IFRAME',
        SUB_TYPE: 'SPOTIFY',
        url: `https://embed.spotify.com/?uri=spotify:${matches[2].split('/').join(':')}`
    } : undefined;
};

const getTweetDetails = (msg) => {
    const matches = TWITTER_REGEX.exec(msg);

    return matches ? {
        type: 'TWEET',
        tweetId: matches[3],
        url: `https://publish.twitter.com/oembed?omit_script=true&url=${matches[1]}`
    } : undefined;
};

const getFacebookDetails = (msg) => {
    let matches = FACEBOOK_VIDEO_REGEX.exec(msg),
        isVideo = !!matches;


    !isVideo && (matches = FACEBOOK_REGEX.exec(msg));

    return matches ? {
        type: 'FACEBOOK',
        url: `https://www.facebook.com/plugins/${isVideo ? 'video' : 'post'}/oembed.json/?url=${matches[1]}`
    } : undefined;
};

const getInstagramDetails = (msg) => {
    const matches = INSTAGRAM_REGEX.exec(msg);

    return matches ? {
        type: 'INSTAGRAM',
        url: `https://api.instagram.com/oembed?url=${matches[1]}`
    } : undefined;
};

const getVineDetails = (msg) => {
    const matches = VINE_REGEX.exec(msg);

    return matches ? {
        type: 'IFRAME',
        SUB_TYPE: 'VINE',
        url: `${matches[1]}/embed/simple`
    } : undefined;
};

/******************************************** MSG FNS ENDS****************************************/


/********************************************INPUT MSG FNS****************************************/

export const INPUT_MSG_EMOTICON_REGEX = /:([a-z]{2,})$/;

const checkForEmoticons = (msg) => {
    const matches = INPUT_MSG_EMOTICON_REGEX.exec(msg);


    if (matches && EmoticonUtils.hasMatchingEmotions(matches[1])) {
        return {
            commandPopover: COMMAND_POPOVERS.EMOTICON
        }
    }

    return undefined;
};


/********************************************INPUT MSG FNS ENDS***********************************/

export default {
    parseMessage: function (msg) {
        var emogifiedMsg = getEmogifiedMsg(msg);

        const mediaDetails = getImageDetails(emogifiedMsg) || getVideoDetails(emogifiedMsg) || getSpotifyDetails(emogifiedMsg) || getTweetDetails(emogifiedMsg) || getFacebookDetails(emogifiedMsg) || getInstagramDetails(emogifiedMsg) || getVineDetails(emogifiedMsg);

        return {text: getLinkifyMsg(emogifiedMsg), mediaDetails};
    },

    parseInputMessage: function (msg) {
        return checkForEmoticons(msg);
    }
}