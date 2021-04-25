//This component is incharge or rendering the heart icon for every post 
import React, { useEffect, useState } from "react";
import { likePost } from "../../../actions/post";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';

const Heart = ({ PID, likes, userID }) => {
    const dispatch = useDispatch();
    const [likeStatus, setLikeStatus] = useState(true);
    const [load, setLoad] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [counter, setCounter] = useState(0)


    const Likes = () => {

        if (likeStatus) {
            return <FavoriteRoundedIcon fontSize="large" />
        } else
            return <FavoriteBorderRoundedIcon fontSize="large" />
    }

    function updateLikes() {

    }

    useEffect(async() => {
        if (counter === 0) {
            await setLikeStatus(Boolean(await likes.find(
                (uid) => parseInt(uid) === parseInt(userID)
            )))
            setLoad(true)
        }
        
    }, []);


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

export default Heart