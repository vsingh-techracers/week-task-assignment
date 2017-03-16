import { bindActionCreators } from 'redux';
import {  fetchApp, reset as resetAppListState } from './AppListActions';

import { store } from '../../../store';

const actions = {
  fetchApp,
  resetAppListState,
};

export default bindActionCreators(actions, store.dispatch);