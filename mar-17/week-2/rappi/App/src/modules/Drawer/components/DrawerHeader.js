import React from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';
import { NavBarHeight } from '../../../utils/platformSpecific';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'grey',
    height: NavBarHeight,
    paddingTop: 15,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    borderColor: 'black',
  },
});

const DrawerHeader = (props, context) => (
  <View style={styles.containerStyle}>
    <View style={styles.closeButton}>
      <Button title={'X'} onPress={context.toggleDrawer} />
    </View>
  </View>
);

DrawerHeader.contextTypes = {
  toggleDrawer: React.PropTypes.func.isRequired,
};

export default DrawerHeader;
