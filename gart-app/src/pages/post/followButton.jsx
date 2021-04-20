import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {
    Button
} from "@material-ui/core/";
import { followUser } from '../../actions/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FollowButton = ({ username, followers, userID}) => {
    const dispatch = useDispatch();
    const [followStatus, setFollowStatus] = useState(true);
    const [load, setLoad] = useState(false)



const Follow = () =>{


        // console.log("status: " ,Boolean(followStatus))
        if(followStatus){
            return <>
            <FontAwesomeIcon icon={faEye} size="lg" />
            {/* <FontAwesomeIcon icon={faEye} size="lg" /> */}
            
            </>
        }else
        return  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
    }

 
    useEffect(() => {
        console.log(followStatus)
        let status = false

        if (followers > 0) {
            if (Boolean(followers.find(
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
        setFollowStatus(status);
        setLoad(true)
        // Follow()
    }, []);

    
    
    

    return (
        <Button
            size="large"
            color="secondary"
            // disabled={user?.result.userID === parseInt(post.creator)}
            onClick={() => {
                dispatch(followUser(username))
                setFollowStatus(!followStatus)
                // Follow()
                // setClick(!isClick)
                // refresh()
            }
            }

        >

            {(load) && (
                <Follow />
             )} 

             {/* {} */}
          {/* {s} */}

        </Button>
    )
}

export default FollowButton