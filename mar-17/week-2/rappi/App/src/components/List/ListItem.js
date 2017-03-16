import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletStyle: {
    width: 10,
    height: 10,
  },
});

const ListItem = ({ itemText, icon }) => (
  <View style={styles.container}>
    {icon && <Image style={styles.bulletStyle} source={icon} />}
    <Text> {itemText} </Text>
  </View>
);

ListItem.propTypes = {
  itemText: PropTypes.string,
  icon: PropTypes.number,
};

ListItem.defaultProps = {
  itemText: undefined,
  icon: undefined,
};

export default ListItem;
