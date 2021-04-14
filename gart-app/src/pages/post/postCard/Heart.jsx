
import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEdit, faHeart, faHippo, faInfoCircle, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { likePost } from "../../../actions/post";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';

const FollowButton = ({ PID, likes, userID }) => {
    const dispatch = useDispatch();
    const [likeStatus, setLikeStatus] = useState(true);
    const [load, setLoad] = useState(false)



const Likes = () =>{


        // console.log("status: " ,Boolean(followStatus))
        if(likeStatus){
            return <FavoriteRoundedIcon fontSize="large" />
        }else
        return <FavoriteBorderRoundedIcon fontSize="large" />
    }

 
    useEffect(() => {
        // console.log(likeStatus)
        let status = false

        if (likes > 0) {
            if (Boolean(likes.find(
                (uid) => parseInt(uid) === parseInt(userID)
            ) ) ){
                // console.log(">>>>")
                // console.log(">>>",Boolean(followers.find(
                //     (uid) => parseInt(uid) === parseInt(userID)
                // )))
                status = true
                // console.log("found")
            }
        }
        
        //  console.log("usereffect", status)
        //  console.log(followers)
        setLikeStatus(status);
        setLoad(true)
        // Follow()
    }, []);

    
    
    

    return (
        <IconButton
            size="small"
            color="secondary"
            // disabled={user?.result.userID === parseInt(post.creator)}
            onClick={() => {
                dispatch(likePost(PID))
                setLikeStatus(!likeStatus)
                // Follow()
                // setClick(!isClick)
                // refresh()
            }
            }

        >

            {(load) && (
                <Likes />
             )} 
          

        </IconButton>
    )
}

export default FollowButton