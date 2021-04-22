//This is used to launch Axios post request 
//API_URL == localhost:5000 server.. can be found/changed in constants dir
//'profile' refers to the variable that is used to store user-info after loggin; foun din reducers/auth.js

import axios from 'axios';
const { API_URL } = require('../constants/constants')

const API = axios.create({ baseURL: `${API_URL}` }); //5000 server

//User info stored as JSON (Token + table row info)
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const fetchPosts = () => API.get('/api/post');
export const createPost = (newPost) => API.post('/api/post/', newPost,  {headers: {
  'Content-Type': 'multipart/form-data'
}});

export const likePost = (id) => API.patch(`/api/post/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/api/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/post/${id}`);

export const followUser = (username) => API.patch(`/api/accounts/${username}/followUser`);

export const getLikedPost = (userID) => API.post(`/api/accounts/liked`, userID)
export const signIn = (formData) => API.post('api/user/login', formData); //axios post
//export const accountInfo = (formData) => API.get('api/accounts/userPosts', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);

export const createContest = (newContest) => API.post('/api/contests/', newContest, {headers: {
  'Content-Type' : 'multipart/form-data'
}});