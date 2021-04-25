import * as api from '../api/index.js';
import {Redirect} from "../constants/actionTypes";

import { AUTH } from "../constants/actionTypes";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT
} from "../constants/actionTypes";


//Makes the request to create a contest on the backend
export const createContest = (post, router) => async (dispatch) => {
    try{
        const {data} = await api.createContest(post);
        dispatch({type: CREATE, payload: data});
        //alert("success")
        router.push("/contests");

} catch (error) {
    if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);

        }
    }
};

export const setWinner = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.setWinner(id, user?.token);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };