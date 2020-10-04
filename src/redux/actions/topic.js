import { post, get, patch, remove } from '../../helper/axios';

// get all
export const fetchTopic = () => {
  const url = 'topics?limit=20';
  return {
    type: 'GETTOPIC',
    payload: get({url}),
  };
};

// get by id
export const detailTopic = id => {
  const url = `topics/${id}`;
  return {
    type: 'DEAIL',
    payload: get({url}),
  };
};

// add topic
export const ask = (body, token) => {
  const url = `topics`;
  const config = { headers: {
          'Authorization': 'Bearer '.concat(token)
        }}
  return {
    type: 'ASK',
    payload: post({url, body, config}),
  };
};

// delete topic
export const deleteTopic = (token, id) => {
  const url = `topics/${id}`;
  const config = { headers: {
          'Authorization': 'Bearer '.concat(token)
        }}
  return {
    type: 'DELETE',
    payload: remove({url}),
  };
};