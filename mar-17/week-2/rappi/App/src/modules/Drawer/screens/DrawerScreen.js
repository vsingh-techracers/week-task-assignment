import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import ScreenView from '../../../components/ScreenView';
import DrawerHeader from '../components/DrawerHeader';
import DrawerFooter from '../components/DrawerFooter';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'darkgray',
    flex: 1,
    justifyContent: 'center',
  },
});

const DrawerScreen = props => (
  <View style={styles.containerStyle}>
    { props.hasHeader && <DrawerHeader /> }
    <ScreenView containerStyle={styles.containerStyle}>
      <Text> {' Content '} </Text>
    </ScreenView>
    { props.hasFooter && <DrawerFooter />}
  </View>
);

DrawerScreen.propTypes = {
  hasFooter: React.PropTypes.bool,
  hasHeader: React.PropTypes.bool,
};

DrawerScreen.defaultProps = {
  hasFooter: false,
  hasHeader: false,
};

export default DrawerScreen;
