import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {
    Button, createMuiTheme, IconButton, MuiThemeProvider
} from "@material-ui/core/";
import { followUser } from '../../actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
const whiteTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#FFF',
            main: '#FFF',
            dark: '#FFF',
            contrastText: '#fff',
        },
    }
})

const FollowButton = ({ username, followers, userID }) => {
    const dispatch = useDispatch();
    const [followStatus, setFollowStatus] = useState(false);
    const [load, setLoad] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [counter, setCounter] = useState(0)
    const [likeArray, setLikeArray] = useState([])

    const user = JSON.parse(localStorage.getItem("profile"));


    const Follow = () => {


        console.log("status: ", Boolean(followStatus))
        if (followStatus) {
            return <FontAwesomeIcon icon={faEye} size="4x" />
        }
        return <FontAwesomeIcon icon={faEyeSlash} size="4x" />
    }

   
    useEffect(async () => {
        console.log("FS",followStatus)
        // let status = fal
        if (counter === 0) {
            await setFollowStatus(Boolean(await followers.find(
                (uid) => parseInt(uid) === parseInt(user?.result?.userID)
            )))
            setLoad(true)
        }

        // if (followers > 0 && counter === 0) {
        //     if (Boolean( await followers.find(
        //         (uid) => parseInt(uid) === parseInt(user?.result?.userID)
        //     ))) {

        //         setFollowStatus(true);
        //         console.log("found")
        //     } else if (counter === 0) {
        //         status = false
        //     } else {
        //         status = followStatus
        //     }
        // }

        //  console.log("usereffect", status)
        //  console.log(followers)
        
        // Follow()
    }, []);



    useEffect(() => {
        if (clicked === true) {
            setFollowStatus(!followStatus)
            console.log("Clicked", followStatus, counter)
            setClicked(false)
            setCounter(counter + 1)
        }
    })


    return (
        <MuiThemeProvider theme={whiteTheme}>

            <IconButton
                // size="large"
                color="primary"
                // disabled={user?.result.userID === parseInt(post.creator)}
                onClick={() => {
                    dispatch(followUser(username))
                    setClicked(true)
                }
                }

            >

                {(load) && (
                    <Follow />
                )}


            </IconButton>
        </MuiThemeProvider>
    )
}

export default FollowButton