import * as api from '../api/index.js';
import {Redirect, CREATE} from "../constants/actionTypes";


export const createContest = (post, router) => async (dispatch) => {
    try{
        const {data} = await api.createContest(post);
        console.log(data)
        console.log("success")
        dispatch({type: CREATE, payload: data});
        alert("success")
        router.push(`/contest/${data._id}`);

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