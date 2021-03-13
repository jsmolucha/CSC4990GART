//WIP
import axios from 'axios';
const { API_URL } = require('../constants/constants')

const API = axios.create({ baseURL: `${API_URL}` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const signIn = (formData) => API.post('api/user/login', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);