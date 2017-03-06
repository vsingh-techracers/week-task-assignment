// @flow
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  PushNotificationIOS,
  AppState,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'

import NavigationManager    from './components/Navigation/NavigationManager'

class Root extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			
		};
	}

	render() {
		return (
			<NavigationManager />
		);
	}
}

export default Root;
