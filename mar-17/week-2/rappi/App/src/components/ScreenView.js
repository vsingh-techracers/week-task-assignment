import React, { Component, PropTypes } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { getViewportHeight } from '../utils/dimensions';
import { NavBarMargin } from '../utils/platformSpecific';

const baseStyles = {
  container: {
    marginTop: NavBarMargin,
  },
};

class ScreenView extends Component {
  getMaxHeight() {
    return getViewportHeight() - (this.props.fullScreen ? 0 : NavBarMargin);
  }

  render() {
    const containerStyle = Object.assign({}, baseStyles.container, {
      alignItems: this.props.centered && !this.props.stretchItems ? 'center' : 'stretch',
      backgroundColor: this.props.color,
      flex: this.props.centered ? 1 : undefined,
      flexDirection: this.props.row ? 'row' : 'column',
      height: this.getMaxHeight() - this.props.keyboardHeight,
      justifyContent: this.props.centered ? 'center' : undefined,
      marginTop: this.props.fullScreen ? 0 : baseStyles.container.marginTop,
    });

    return (
      <KeyboardAvoidingView
        behavior={'position'}
        style={[containerStyle, this.props.containerStyle]}
        accessibilityLabel={this.props.accessibilityLabel}
      >
        {
          this.props.scrollable ?
            <ScrollView keyboardShouldPersistTaps={'always'}>
              {this.props.children}
            </ScrollView> : this.props.children
        }
      </KeyboardAvoidingView>
    );
  }

}

ScreenView.propTypes = {
  accessibilityLabel: PropTypes.string,
  children: PropTypes.node,
  centered: PropTypes.bool,
  color: PropTypes.string,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  fullScreen: PropTypes.bool,
  keyboardHeight: PropTypes.number,
  row: PropTypes.bool,
  scrollable: PropTypes.bool,
  stretchItems: PropTypes.bool,
};

ScreenView.defaultProps = {
  accessibilityLabel: '',
  children: PropTypes.children,
  centered: false,
  color: 'transparent',
  containerStyle: {},
  fullScreen: false,
  keyboardHeight: 0,
  row: false,
  scrollable: false,
  stretchItems: false,
};

export default ScreenView;
