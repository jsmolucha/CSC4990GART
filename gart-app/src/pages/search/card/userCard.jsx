//This component will render username in a clean fasion for search purposes
//can be recycled to display followers
//Username + random icon or previous post + links to their account and maybe a follow button
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import "./card.scss"
import FollowButton from "../../post/followButton";
const UserCard = ({ username, currentUser }) => {
    const history = useHistory()

    return (
        <>
            <div className="card">
                <div className="card-avatar">
                    {(username?.username != currentUser) ? (<div className="item">
                        <FollowButton username={username?.username} followers={username?.followers} />

                    </div>) : (<FontAwesomeIcon icon={faIcons} size="5x" />)}

                </div>

                <div className="card-details">
                    <div className="name">{(username?.fullName) ? (username?.fullName) : (username?.username)}</div>
                    <div className="occupation">
                        <a href={`/@${username.username}`}>
                            @{username?.username}
                        </a>
                    </div>

                    <div className="card-about">
                        <div className="item">
                            <span className="value">{(username?.followers?.length > 0) ? (username?.followers?.length) : (0)}</span>
                            <span className="label">{(username?.followers?.length == 1) ? (<>follower</>) : (<>followers</>)}</span>
                        </div>

                        <div className="item">
                            <span className="value">{(username?.following?.length > 0) ? (username?.followers?.length) : (0)}</span>
                            <span className="label">following</span>
                        </div>


                    </div>
                   {(username?.username === currentUser) && (<div class="skills">
                        <span class="value" style={{fontWeight : "bold"}}>
                        <a href={`/@${username.username}/profileUpdate`}>
                            View Account Details 
                        </a>
                        </span>

                    </div>)}
                </div>
            </div>
        </>
    )
}

export default UserCard