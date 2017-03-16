import React, { Component } from 'react';
import { Provider } from 'react-redux';
import runRootSaga from './sagas/index';
import { store } from './store';
import Router from './Router';

export default class Rappi extends Component {
  constructor() {
    super();

    runRootSaga();
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
