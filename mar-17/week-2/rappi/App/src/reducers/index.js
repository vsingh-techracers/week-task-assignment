import { combineReducers } from 'redux';
import apps from '../modules/AppList/reducers';

const reducers = {
  apps,
};

export default combineReducers(reducers);
