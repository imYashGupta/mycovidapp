import React, { Component } from 'react'
import Navigation from "./navigation/MainNavigation";
import Codepush from "react-native-code-push";
import RNBootSplash from "react-native-bootsplash";


class App extends Component {
    componentDidMount() {
        RNBootSplash.hide({ duration: 250 });
    }
    render() {
        return ( <
            Navigation / >
        )
    }
}

const codePushOptions = {
    checkFrequency: Codepush.CheckFrequency.ON_APP_START
}
export default Codepush(codePushOptions)(App);