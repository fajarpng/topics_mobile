import { post, get, patch, remove } from '../../helper/axios';

// get comment by topik id
export const fetchComment = id => {
  const url = `comments?topik_id=${id}`;
  return {
    type: 'GET',
    payload: get({url}),
  };
};

// create comment
export const addComment = body => {
  const url = 'comments';
  return {
    type: 'EDIT',
    payload: post({url, body}),
  };
};

// edit comment
export const editComment = (body, id) => {
  const url = `comments/${id}`;
  return {
    type: 'EDIT',
    payload: patch({url, body}),
  };
};

// delete comment
export const removeComment = id => {
  const url = `comments/${id}`;
  return {
    type: 'EDIT',
    payload: remove({url}),
  };
};

