/* global fetch:true*/
/* global FormData:true*/
/* eslint no-undef: "error"*/
import Config from '../../../../config';

let authorizationToken;

const getHeaders = () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  const token = authorizationToken;
  return token ? {
    Authorization: `Token ${token}`,
    ...headers,
  } : headers;
};

function statusHelper(response) {
  let promise;
  if (response.status >= 200 && response.status < 300) {
    promise = Promise.resolve(response);
  } else {
    promise = Promise.reject(new Error(response.statusText));
  }

  return promise;
}

export const apiCall = (url, method, body) => fetch(`${url}`, {
  method,
  headers: getHeaders(),
  body,
})
  .then(statusHelper)
  .then(response => response.json())
  .catch(error => error)
  .then(data => data);

export const setAuthorizationToken = (token) => {
  authorizationToken = token;
};

export const getApiCall = (url, body) => apiCall(url, 'GET', body);

export const postApiCall = (url, body) => {
  let formData;
  if (Object.keys(body).length > 0) {
    formData = new FormData();

    Object.keys(body).forEach(key =>
      formData.append(key, body[key]),
    );
  }

  return apiCall(url, 'POST', formData);
};
