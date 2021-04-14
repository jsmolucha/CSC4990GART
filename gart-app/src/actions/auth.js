//https://redux.js.org/faq/actions
//This file  uses signIn function found in api/index.js to send an axios post (found in previous version)
//The server side is designed to send the token and user info as a JSON file.
//if successfull then data = JSON then dispatch stores it (reducers/auth.js) in localstorage
//Server is designed to send 400 status error to which is handled here

import { AUTH, FETCH_ALL, LIKE } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { Redirect, Route } from 'react-router';


// import { AUTH } from "../constants/actionTypes";
// import * as api from "../api/index.js";
// import {
//   FETCH_ALL,
//   CREATE,
//   UPDATE,
//   DELETE,
//   LIKE,
// } from "../constants/actionTypes";


export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log(data)
    dispatch({ type: AUTH, data });
    alert("Success")
    router.push('/main'); //redirect to main page
  } catch (error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            alert(error.response.data)
            console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      console.log(data)
      dispatch({ type: AUTH, data });
      alert("Success")
      router.push('/main'); //redirect to main page
    } catch (error) {
          if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              alert(error.response.data)
              console.log(error.response.status);
              // console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
          }
      }
  };

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
    {...rest}
    render={props =>
        localStorage.getItem("profile") ? (
            <Component {...props} />
        ) : (
            <Redirect 
                to ={{
                    pathname: "/login",
                    state: {from: props.location}
                }}
            />
        )
    }
    />
);


export const followUser = (username) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      //  console.log(user.token)
      const { data } = await api.followUser(username, user?.token);
    //   const { data } = await api.likePost(id, user?.token);
  
    //   dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
// This is signup code from the video source 
// export const signup = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);

//     dispatch({ type: AUTH, data });

//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };