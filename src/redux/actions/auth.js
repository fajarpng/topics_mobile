import { post,get } from '../../helper/axios';

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
