import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import _ from 'lodash';
import { tabBarHeight, activeTabBorderColor } from '../../constants/styles';
import { getViewportWidth } from '../../utils/dimensions';
import TabItem from './TabItem';

const styles = StyleSheet.create({
  container: {
    height: tabBarHeight,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  innerLayout: {
    flex: 1,
  },
  indicator: {
    height: 3,
    backgroundColor: activeTabBorderColor,
  },
});

export class TabBar extends Component {
  constructor(props) {
    super(props);

    this.animatedWidth = new Animated.Value(125);
    this.translateIndicator = new Animated.Value(0);
    this.renderAnimation = this.renderAnimation.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { selectedOption } = this.props;
    if (nextProps.selectedOption === selectedOption) {
      return;
    }

    this.renderAnimation(nextProps);
  }

  renderAnimation(nextProps) {
    const { options, selectedOption } = this.props;
    const idleWidth = getViewportWidth() / options.length;
    const travelingReverse = selectedOption > nextProps.selectedOption;
    const travelDistance = travelingReverse ?
      selectedOption - nextProps.selectedOption :
      nextProps.selectedOption;

    const expandSize = Animated.timing(this.animatedWidth, {
      toValue: idleWidth + (travelDistance * idleWidth),
      duration: 300,
    });

    const shrinkSize = Animated.timing(this.animatedWidth, {
      toValue: idleWidth,
      duration: 200,
    });

    const translate = Animated.timing(this.translateIndicator, {
      toValue: idleWidth * nextProps.selectedOption,
      duration: 200,
    });

    if (travelingReverse) {
      translate.start();
    } else {
      expandSize.start(() => {
        translate.start();
        shrinkSize.start();
      });
    }
  }

  render() {
    const {
      options,
      selectedOption,
      renderSeparator,
      onSelectOption,
    } = this.props;
    return (
      <View>
        <View style={styles.container}>
          {
            _.map(options, (option, index) => (
              <View key={index} style={[styles.container, styles.innerLayout]}>
                <TabItem
                  title={option}
                  index={index}
                  isSelected={index === selectedOption}
                  onSelect={onSelectOption}
                />
                {renderSeparator && (options.length - 1 !== index) && renderSeparator()}
              </View>
            ))
          }
        </View>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: this.animatedWidth,
              transform: [{
                translateX: this.translateIndicator,
              }],
            },
          ]}
        />
      </View>
    );
  }
}

TabBar.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  renderSeparator: PropTypes.func,
  onSelectOption: PropTypes.func,
  selectedOption: PropTypes.number,
};

TabBar.defaultProps = {
  options: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  renderSeparator: _.noop,
  onSelectOption: _.noop,
  selectedOption: undefined,
};

export default TabBar;
