import { post, get, patch } from '../../helper/axios';

export const login = body => {
  const url = 'users/login';
  return {
    type: 'LOGIN',
    payload: post({url, body}),
  };
};

export const regis = body => {
  const url = 'users';
  return {
    type: 'REGIS',
    payload: post({url, body}),
  };
};

export const update = (body, token, id) => {
  const url = `users/${id}`;
  const config = { headers: {
          'Authorization': 'Bearer '.concat(token)
        }}
  return {
    type: 'UPDATE',
    payload: patch({url, body, config}),
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const clear = () =>{
  return {
    type: 'CLEAR',
  };
};
