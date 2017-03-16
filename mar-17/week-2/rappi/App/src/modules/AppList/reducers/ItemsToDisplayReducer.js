import {
  FETCH_APP_REQUEST,
  FETCH_APP_FAILURE,
  FETCH_APP_SUCCESS,
  RESET,
} from '../actions/AppListActionTypes';

const initialState = {
  isLoading: false,
  appList: [],
  itemNo: 0,
};

function ItemsToDisplayReducer(state = initialState, action) {
  if (action.type === 'undefined') {
    return state;
  }

  switch (action.type) {
    case FETCH_APP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_APP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        appList: action.data,
      };

    case FETCH_APP_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}

export default ItemsToDisplayReducer;
