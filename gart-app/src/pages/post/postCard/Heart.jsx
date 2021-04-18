//This component is incharge or rendering the heart icon for every post 
import React, { useEffect, useState } from "react";
import { likePost } from "../../../actions/post";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
// import { getPostLikes } from '../../../actions/post.js'

const FollowButton = ({ PID, likes, userID }) => {
    const dispatch = useDispatch();
    const [likeStatus, setLikeStatus] = useState(true);
    const [load, setLoad] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [counter, setCounter] = useState(0)
    const [likeArray, setLikeArray] = useState([])


    const Likes = () => {

        if (likeStatus) {
            return <FavoriteRoundedIcon fontSize="large" />
        } else
            return <FavoriteBorderRoundedIcon fontSize="large" />
    }

    function updateLikes() {
        //OG intention was to fetch an updated version but decidided to ommit for now
        // alert("hello")
        // dispatch(getPostLikes(PID)).then(data => {
        //     setLikeArray(data)
        // })

    }

    useEffect(() => {
        let status = false

        if (likes > 0 && counter === 0) {
            if (
                Boolean(likes.find(
                    (uid) => parseInt(uid) === parseInt(userID)
                ))) {
                status = true
                // console.log("found")
            }
        } else if (counter == 0) {
            status = false
        } else {
            status = likeStatus
        }
        setLikeStatus(status);
        setLoad(true)
    }, [updateLikes]);


    useEffect(() => {
        if (clicked === true) {
            setLikeStatus(!likeStatus)
            console.log("Clicked", likeStatus, counter)
            setClicked(false)
            setCounter(counter + 1)
        } 
    })




    return (
        <IconButton
            size="small"
            color="secondary"
            // disabled={user?.result.userID === parseInt(post.creator)}
            onClick={() => {
                dispatch(likePost(PID))
                setClicked(true)
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