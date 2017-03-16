import _ from 'lodash';
import { Platform, Dimensions } from 'react-native';

import ExtraDimensions from 'react-native-extra-dimensions-android';

const isiOS = () => Platform.OS === 'ios';

function sumHeightsOf(decorators) {
  return _(decorators)
    .map(decorator => ExtraDimensions.get(decorator) || 0)
    .sum();
}

export const getViewportHeight = () => {
  if (isiOS()) {
    return Dimensions.get('window').height;
  }

  return ExtraDimensions.get('REAL_WINDOW_HEIGHT') - sumHeightsOf(['SOFT_MENU_BAR_HEIGHT', 'STATUS_BAR_HEIGHT', 'SMART_BAR_HEIGHT']);
};

export const getViewportWidth = () => Dimensions.get('window').width;
