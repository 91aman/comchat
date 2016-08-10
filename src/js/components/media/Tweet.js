/**
 * Created by amanjain on 08/08/16 at 5:27 PM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

class Tweet extends Component {
    render() {
        return (
            <div ref="tw-container" />
        );
    }

    componentDidMount() {
        twttr.widgets.createTweet(
            this.props.tweetId,
            this.refs['tw-container']
        ).then(() => {
            console.log('rendered')
        });
    }
}

export default Tweet;