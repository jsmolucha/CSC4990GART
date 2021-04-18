import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";



export const createPost = (post, router) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    console.log(data)
    console.log("Success");
    //   alert("Im called")
    dispatch({ type: CREATE, payload: data });
    alert("Success")
    //   console.log(data)
    //   dispatch({ type: AUTH, data });
    //   alert("Success")
      router.push(`/post/${data._id}`); //redirect to main page
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

export const updatePost = (id, post, router) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    router.push(`/post/${data._id}`); 
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    //  console.log(user.token)
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
    console.log("success")
    alert("Post successfully deleted")
    // router.push(`/main`)
  } catch (error) {
    console.log(error);
  }
};

export const getPostLikes = (PID) => async(dispatch) =>{

  try{
    const {data} = await api.fetchPost(PID)
    console.log("coming from ACTIONS",data)
    return data.likes
  }catch(error){
    console.log(error)
  }
}