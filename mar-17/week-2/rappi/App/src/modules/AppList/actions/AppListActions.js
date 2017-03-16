import { getApiAction } from '../../Api/ApiActions';
import {
  RESET,
  FETCH_APP_FAILURE,
  FETCH_APP_REQUEST,
  FETCH_APP_SUCCESS,
} from './AppListActionTypes';

export const fetchApp = () => getApiAction(
  {
    types: [FETCH_APP_REQUEST, FETCH_APP_SUCCESS, FETCH_APP_FAILURE],
    url: 'https://itunes.apple.com/us/rss/topfreeapplications/limit=20/json',
  },
);

export const reset = () => ({
  type: RESET,
});
