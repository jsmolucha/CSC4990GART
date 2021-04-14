import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

//this action is used to get all the post that the userfollows
export const getLikePost = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      //  console.log(user.token)
      const { data } = await api.getFollowPost(user?.result?.userID);
  
    //   dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  