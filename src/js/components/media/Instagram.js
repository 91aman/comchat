/**
 * Created by amanjain on 10/08/16 at 12:26 AM.
 * Description :
 */


import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

class Instagram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: ''
        }
    }


    render() {
        return (<div ref="tw-container" dangerouslySetInnerHTML={{ __html : this.state.html}} />)
    }

    componentDidUpdate(){
        instgrm.Embeds.process()
    }

    componentDidMount() {
        $.ajax({
            type: "GET",
            url: this.props.url,
            dataType: "jsonp",
            success: (data) => {
                console.log(data);
                this.setState({html: data.html})
            }
        });

    }
}

export default Instagram;