import { post, get, patch } from '../../helper/axios';

export const fetchComment = () => {
  const url = 'comments';
  return {
    type: 'GET',
    payload: get({url}),
  };
};

export const addComment = body => {
  const url = `topics/${id}`;
  return {
    type: 'ADD',
    payload: post({url}),
  };
};

