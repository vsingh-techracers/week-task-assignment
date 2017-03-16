import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { tabItemBGColor } from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tabItemBGColor,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
  },
  textWrapper: {
    marginBottom: 3,
  },
});

const TabItem = ({ title, index, onSelect }) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => onSelect(index)}
  >
    <View style={styles.textWrapper}>
      <Text style={styles.title}> {title} </Text>
    </View>
  </TouchableOpacity>
);

TabItem.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  onSelect: PropTypes.func,
};

TabItem.defaultProps = {
  title: 'Tab title',
  index: undefined,
  onSelect: _.noop,
};

export default TabItem;
