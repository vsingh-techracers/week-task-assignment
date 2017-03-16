import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import _ from 'lodash';
import Tabbar from './TabBar';
import { arrayWithKey } from '../../utils/transformAsConfig';
import { getViewportWidth } from '../../utils/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    backgroundColor: 'lightgrey',
    width: getViewportWidth(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class TabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
    };

    this.renderComponent = this.renderComponent.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(event) {
    this.setState({
      currentTab: _.round(Math.round(event.nativeEvent.contentOffset.x / getViewportWidth())),
    });
  }

  renderComponent() {
    return _.map(this.props.tabs, (tab, index) =>
      <ScrollView
        key={index}
        contentContainerStyle={styles.tabContainer}
        scrollEnabled={this.props.scrollable}
      >
        {tab.component}
      </ScrollView>,
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Tabbar
          selectedOption={this.state.currentTab}
          options={arrayWithKey(this.props.tabs, 'title')}
          onSelectOption={currentTab => this.setState({ currentTab })}
        />
        <ScrollView
          horizontal
          ref={(tabView) => { this.tabView = tabView; }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'center' }}
          onScroll={this.updateState}
          pagingEnabled
        >
          {this.renderComponent()}
        </ScrollView>
      </View>
    );
  }
}

TabView.propTypes = {
  scrollable: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      component: PropTypes.object,
    }),
  ),
};

TabView.defaultProps = {
  scrollable: undefined,
  tabs: [
    {
      title: 'tab 1',
      component: <Text> item 1 </Text>,
    },
    {
      title: 'tab 2',
      component: <Text> item 2 </Text>,
    },
    {
      title: 'tab 3',
      component: <Text> item 3 </Text>,
    },
  ],
};
