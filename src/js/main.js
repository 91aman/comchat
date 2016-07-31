import React from 'react';
import ReactDOM from 'react-dom'
import ChatApp from './chatApp'
import _ from "lodash"
import styles from "../css/main.scss"

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'


function getDefaultState() {
    var matches = /\/(.*)/.exec(window.location.pathname),
        channelName = matches[1];

    return {
        channelName,
        disableChannelName: !!channelName
    }
}


let store = createStore(reducers, getDefaultState());

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(<Provider store={store}><ChatApp /></Provider>, document.getElementById('app'));