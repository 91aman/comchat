/**
 * Created by amanjain on 09/08/16 at 11:59 PM.
 * Description :
 */



import React, {Component, PropTypes} from 'react';
import $ from 'jquery';

class Facebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            html: ''
        }
    }


    render() {
        return (
            <div ref="fb-container" dangerouslySetInnerHTML={{ __html : this.state.html}}></div>
        );
    }

    componentDidUpdate(){
        FB.XFBML.parse( this.refs['fb-container']);
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

export default Facebook;