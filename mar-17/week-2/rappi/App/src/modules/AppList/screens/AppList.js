import React, { Component, PropTypes }from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import sceneGenerator from '../../../utils/sceneGenerator';
import AppListActions from '../actions';

export class AppList extends Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  componentWillMount() {
    setTimeout(this.props.fetchApp, 10);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppList.propTypes = {
  fetchApp: PropTypes.func,
  appList: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.any),
      PropTypes.objectOf(PropTypes.any),
    ],
  ),
};

AppList.defaultProps = {
  fetchMore: _.noop,
  appList: [],
};

const mapStateToProps = state=> ({
  appList: state.apps.itemsToDisplay.appList,
  isLoading: state.apps.itemsToDisplay.isLoading,
  itemNo: state.apps.itemsToDisplay.itemNo,
});

const mapDispatchToProps = () => AppListActions;

const reduxConnected = connect(mapStateToProps, mapDispatchToProps)(AppList);

export default sceneGenerator({
  component: reduxConnected,
  key: 'appListScreen',
});
