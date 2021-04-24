//This component is incharge or rendering the heart icon for every post 
import React, { useEffect, useState } from "react";
import { setWinner } from "../../../actions/contest.js";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { useDispatch } from "react-redux";
import {
    Button, createMuiTheme, IconButton, MuiThemeProvider
} from "@material-ui/core/";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarBorder from "@material-ui/icons/StarBorder";
// import { getPostLikes } from '../../../actions/post.js'
const medalTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#ffdf00',
            main: '#ffdf00',
            dark: '#ffdf00',
            contrastText: '#ffdf00',
        },
    }
})
const Medal = ({ contestObject, userID }) => {
    const dispatch = useDispatch();
    const [likeStatus, setLikeStatus] = useState(true);
    const [load, setLoad] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [counter, setCounter] = useState(0)
    const [likeArray, setLikeArray] = useState([])


    const Likes = () => {

        if (likeStatus) {
            return <StarIcon fontSize="large" />
        } else
            return <StarBorderIcon fontSize="large" />
    }


    useEffect(async () => {
        if (counter === 0) {
            await setLikeStatus(Boolean(await contestObject?.winners?.find(
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
        <MuiThemeProvider theme={medalTheme}>

            <IconButton
                size="small"
                color="primary"
                // disabled={user?.result.userID === parseInt(post.creator)}
                onClick={() => {
                    dispatch(setWinner(contestObject._id))
                    console.log("Set winner was clicked", contestObject)
                    setClicked(true)
                }
                }

            >

                {(load) && (
                    <Likes />
                )}


            </IconButton>
        </MuiThemeProvider>
    )
}

export default Medal