/* eslint global-require: "off" */
import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const loaderDark = require('../../assets/images/loader-black.gif');
const loader = require('../../assets/images/loader-white.gif');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loadingWrapper: {
    flex: 1,
  },
  loadingImage: {
    flex: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    flex: 1,
  },
});

const Loader = ({ children, dark, loading, loadingText }) => {
  const loadingImage = dark ? loaderDark : loader;

  return (
    <View style={styles.container}>
      { loading ? <View style={styles.loadingWrapper}>
        <Image
          style={styles.loadingImage}
          resizeMode={'contain'}
          source={loadingImage}
        />
        {
          loadingText && <Text style={[styles.text, dark && { color: 'black' }]} adjustsFontSizeToFit>
            {loadingText}
          </Text>
        }
      </View> :
        children
      }
    </View>
  );
};

Loader.propTypes = {
  children: PropTypes.node,
  dark: PropTypes.bool,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

Loader.defaultProps = {
  children: undefined,
  dark: false,
  loading: false,
  loadingText: undefined,
};

export default Loader;
