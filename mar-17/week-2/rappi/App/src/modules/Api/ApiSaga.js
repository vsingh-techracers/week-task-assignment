import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { GET_API_ACTION, POST_API_ACTION } from './ApiActionTypes';
import { getApiCall, postApiCall } from './Api';
import testConnectivity from '../../utils/testConnectivity';

export function* getApi(action) {
  try {
    yield call(testConnectivity);
    yield put({ type: action.types[0] });
    const response = yield call(getApiCall, action.url, action.body);
    if (response.error) {
      yield put({ type: action.types[2], data: response });
    } else {
      yield put({ type: action.types[1], data: response });
    }
  } catch (e) {
    yield Alert.alert('Check you network connectivity');
  }
}

export function* postApi(action) {
  try {
    yield call(testConnectivity);
    yield put({ type: action.types[0] });
    const response = yield call(postApiCall, action.url, action.body);

    if (response.error) {
      yield put({ type: action.types[2], data: response });
    } else {
      yield put({ type: action.types[1], data: response });
    }
  } catch (e) {
    yield Alert.alert('Check you network connectivity');
  }
}

export function* watchGetApi() {
  yield* takeEvery(GET_API_ACTION, getApi);
}

export function* watchPostApi() {
  yield* takeEvery(POST_API_ACTION, postApi);
}
