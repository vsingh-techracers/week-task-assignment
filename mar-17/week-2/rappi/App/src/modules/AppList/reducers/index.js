import { combineReducers } from 'redux';
import itemsToDisplay from './ItemsToDisplayReducer';

const reducers = {
  itemsToDisplay
};

export default combineReducers(reducers);