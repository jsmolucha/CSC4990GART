import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";




export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    console.log(data)
    console.log("Success");
    //   alert("Im called")
    dispatch({ type: CREATE, payload: data });
    //   console.log(data)
    //   dispatch({ type: AUTH, data });
    //   alert("Success")
    //   router.push('/main'); //redirect to main page
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      //   alert(error.response.data)//
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
