import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import AppList from './modules/AppList/AppListScene';

const Routes = () => (
  <Router>
    <Scene key={'app_root'}>
      {AppList}
    </Scene>
  </Router>
);

export default Routes;
