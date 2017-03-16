import { GET_API_ACTION, POST_API_ACTION } from './ApiActionTypes';

export const getApiAction = body => ({
  type: GET_API_ACTION,
  method: 'GET',
  ...body,
});

export const postApiAction = body => ({
  type: POST_API_ACTION,
  method: 'POST',
  ...body,
});
