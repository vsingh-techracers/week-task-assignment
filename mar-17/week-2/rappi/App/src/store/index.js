import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducers from '../reducers';
import Config from '../../../config';

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, hasReduxLogger, addRemoteDevTools) {
  const middleWares = [sagaMiddleware];

  if (hasReduxLogger) {
    middleWares.push(createLogger());
  }
  const enhancer = addRemoteDevTools
    ? composeWithDevTools(applyMiddleware(...middleWares))
    : compose(applyMiddleware(...middleWares));

  const Store = createStore(reducers, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers').default;
      Store.replaceReducer(nextRootReducer);
    });
  }

  return Store;
}

export const store = configureStore({}, Config.REDUX_LOGGER, Config.REMOTE_DEV_TOOLS);
