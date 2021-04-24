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


//Each one of these is creating the request and is being called in the actions
export const fetchPosts = () => API.get('/api/post');
export const fetchPost = (PID) => API.get(`/api/post/${PID}`)
export const createPost = (newPost) => API.post('/api/post/', newPost,  {headers: {
  'Content-Type': 'multipart/form-data'
}});

export const likePost = (id) => API.patch(`/api/post/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/api/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/post/${id}`);

export const followUser = (username) => API.patch(`/api/accounts/${username}/followUser`);

export const searchPost = (query) => API.get(`/api/search/post/${query}`)
export const searchUsername = (query) => API.get(`/api/search/users/${query}`)
export const addComment = (newComment) => API.post('/api/post/addComment', newComment)

export const getLikedPost = (userID) => API.post(`/api/accounts/liked`, userID)
export const signIn = (formData) => API.post('api/user/login', formData); //axios post
//export const accountInfo = (formData) => API.get('api/accounts/userPosts', formData);

export const createContest = (newContest) => API.post('/api/contests/newContest', newContest);


export const getSingleContest = (contestId) => API.get(`/api/contests/getSingleContest/${contestId}`)
export const authenticate = () => API.get('/api/user/authenticate');
export const signUp = (formData) => API.post('api/user/newUser', formData);
