//This component will render username in a clean fasion for search purposes
//can be recycled to display followers
//Username + random icon or previous post + links to their account and maybe a follow button
import React, { useEffect, useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@material-ui/core/";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
// import sass from "node-sass"
import "./card.scss"
// import FollowButton from "../../post/followButton";
import moment from "moment";
const ContestCard = ({ contest }) => {
    const history = useHistory()

    return (
        <>
            {/* {console.log(">>>", username)} */}
            <div className="card">
                <div className="card-avatar">
                    <FontAwesomeIcon icon={faTrophy} size="5x" />
                </div>

                <div className="card-details">
                    <div className="name">{contest?.title}</div>
                    <div className="occupation">
                        {/* <Button onClick={() => history.push(`/@${username.username}`)}>  */}
                        <a href={`/@${contest?.creator}`}>
                            @{contest?.creator}
                        </a>
                        {/* </Button> */}
                    </div>

                    <div className="card-about">
                        <div className="item">
                            <span className="value">
                            <a href={`/constest-submissions/${contest._id}`}>Join</a>
                            </span>
                            {/* <span className="label"></span> */}
                        </div>

                        <div className="item">
                            <span className="value">
                            <a href={`/constest-detail/${contest._id}`}>See Post</a>
                            </span>
                            {/* <span className="label"></span> */}
                        </div>


                    </div>
                    <div class="skills">
                        <span class="value">{moment(contest.createdAt).fromNow()}</span>
                        <span class="value">{contest?.description}</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ContestCard