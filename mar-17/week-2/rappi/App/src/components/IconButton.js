/* eslint global-require: "off" */
import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { navBarIconSize } from '../constants/styles';

const defaultIcon = require('../../assets/images/default.png');

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: navBarIconSize,
    height: navBarIconSize,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
  },
});

const IconButton = (props) => {
  const {
    icon,
    uri,
    title,
    onPress,
    containerStyle,
    iconStyle,
    textWrapperStyle,
    textStyle,
  } = props;
  const iconToDisplay = icon || defaultIcon;

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      <Image
        style={[styles.icon, iconStyle]}
        source={uri ? { uri } : iconToDisplay}
      />
      {
        title && <View style={[textWrapperStyle]}>
          <Text style={[styles.titleStyle, textStyle]}> {title} </Text>
        </View>
      }
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  icon: PropTypes.number,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onPress: PropTypes.func,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  title: PropTypes.string,
  textWrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  uri: PropTypes.string,
};

IconButton.defaultProps = {
  containerStyle: undefined,
  icon: undefined,
  iconStyle: undefined,
  onPress: undefined,
  title: undefined,
  textWrapperStyle: undefined,
  textStyle: undefined,
  uri: undefined,
};

export default IconButton;
