import React from 'react';
import { Scene } from 'react-native-router-flux';

import AppList from './screens/AppList';

export default (
  <Scene key={'shop_tree'} direction={'vertical'} title={'AppList'} >
    {AppList}
  </Scene>
);
