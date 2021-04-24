import * as api from "../api/index.js";

export const searchPost = (query) => async() =>{
console.log("the given query is ", query)
    try{
        const { data } = await api.searchPost(query)
        // console.log("Search Action: ", data)
        return data
    }catch(error){
        console.log(error)
    }


}