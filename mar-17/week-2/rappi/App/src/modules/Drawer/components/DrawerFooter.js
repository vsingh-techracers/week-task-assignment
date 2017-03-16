import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavBarHeight } from '../../../utils/platformSpecific';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'grey',
    height: NavBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DrawerFooter = () => (
  <View style={styles.containerStyle}>
    <Text> {' Footer '} </Text>
  </View>
);

export default DrawerFooter;
