import { fork } from 'redux-saga/effects';
import { sagaMiddleware } from '../store/index';
import StartupSaga from './startupSaga';
import { watchGetApi, watchPostApi } from '../modules/Api/ApiSaga';

function* root() {
  yield fork(StartupSaga);
  yield fork(watchGetApi);
  yield fork(watchPostApi);
}

const run = () => sagaMiddleware.run(root);

export default run;
