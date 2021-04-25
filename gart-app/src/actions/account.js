import * as api from "../api/index.js";

//this action is used to get all the post that the userfollows
export const getLikePost = () => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
  
    try {
      const { data } = await api.getFollowPost(user?.result?.userID);
  
    } catch (error) {
      console.log(error);
    }
  };
  