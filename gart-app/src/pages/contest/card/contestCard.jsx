//This component will render username in a clean fasion for search purposes
//can be recycled to display followers
//Username + random icon or previous post + links to their account and maybe a follow button
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import "./card.scss"
import moment from "moment";
const ContestCard = ({ contest }) => {
    const history = useHistory()

    return (
        <>
            <div className="card">
                <div className="card-avatar">
                    <FontAwesomeIcon icon={faTrophy} size="5x" />
                </div>

                <div className="card-details">
                    <div className="name">{contest?.title}</div>
                    <div className="occupation">
                        <a href={`/@${contest?.creator}`}>
                            @{contest?.creator}
                        </a>
                    </div>

                    <div className="card-about">
                        <div className="item">
                            <span className="value">
                            <a href={`/constest-submissions/${contest._id}`}>Join</a>
                            </span>
                        </div>

                        <div className="item">
                            <span className="value">
                            <a href={`/constest-detail/${contest._id}`}>See Post</a>
                            </span>
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