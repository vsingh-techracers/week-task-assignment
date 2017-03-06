import React, { Component } from 'react'
import {
  Navigator,
  Text
} from 'react-native'

import Routes                   from './Routes'
import BackButton               from './BackButton'
import EditProfile                from '../EditProfile'
import ProfileView                from '../ProfileView'
import {barStyles}              from '../../styles/BarStyles'

export default class NavigationManager extends Component{
  render() {
    return (
      <Navigator
          initialRoute={Routes.editProfile}
           renderScene={(route, navigator) => this.renderScene(route, navigator)}
         navigationBar={this.configureNavigationBar()}
        configureScene={(route) => this.configureScene(route)} />
    )
  }

  configureNavigationBar() {
    return (
      <Navigator.NavigationBar
              style={barStyles.navBar}
        routeMapper={NavigationBarRouteMapper} />
    )
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.PushFromRight
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'profileView':
        return (
          <ProfileView
            navigator={navigator}/>
        )
      default:
        return (
          <EditProfile
            navigator={navigator} />
        )
    }
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index) {
    if (route.index == 0) {
      return null
    }
    return (
      <BackButton
        navigator={navigator}/>
    )
  },
  RightButton(route, navigator, index, navState) {
    return (
      <Text></Text>
    )
  },
  Title(route, navigator, index) {
    switch(route.id) {
      case 'editProfile':
        return (
          <Text
            style={[barStyles.navBarText, barStyles.navBarTitleText]}
            numberOfLines={1}>
            Edit Profile
          </Text>
        )
      case 'profileView':
        return (
          <Text
            style={[barStyles.navBarText, barStyles.navBarTitleText]}
            numberOfLines={1}>
            Profile
          </Text>
        )
      default:
        return null
    }
  }
}
