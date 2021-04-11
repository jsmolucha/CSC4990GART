
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHeart, faHippo, faInfoCircle, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { likePost } from "../../../actions/post";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";
export default function Heart({ postId, userID, creator, likes }) {
    //likes []
    const dispatch = useDispatch();
    const [isClick, setClick] = useState(false);
    const [likeState, setLikeState] = useState({status : false})

    const heartIcons = {
        unliked: FavoriteRoundedIcon,
        liked: FavoriteBorderRoundedIcon,
    }


    // useEffect(

    //         () => {
    //             if(isClick){

    //             }
    //         }
    // )
    // useEffect(
    //     () => {
    //         funtion stateChanger(status) {
    //             if (likes.find((like) => parseInt(like) === parseInt(userID))) {

    //             setLikeState(likeState = true)
    //         }
    //         else {

    //             setLikeState(likeState = false)
    //         }}
    //     }, []
    // )

    useEffect(() => {
        if (likes.find((like) => parseInt(like) === parseInt(userID))) {
        setLikeState(likeState => ({ ...likeState, status: true })) }
        else{
            setLikeState(likeState => ({ ...likeState, status: false })) 
        }

    }, [likes]);

   
    // useEffect(() => {
    //     setState(state => ({ ...state, b: props.b }));
    // }, [props.b]);
    return (
        <Button
            size="small"
            color="secondary"
            disabled={parseInt(userID) === parseInt(creator)}
            onClick={() => {
                dispatch(likePost(postId));
                setClick(true)
                // refresh()
            }}
        >

            {(likeState.status) && (
                <heartIcons.liked fontSize="large" />)}
            {(likeState).status && (
                <heartIcons.liked fontSize="large" />)}
        </Button>
    )
}