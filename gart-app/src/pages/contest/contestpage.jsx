import React, {useEffect, useState} from 'react'
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
  } from "@material-ui/core/";

import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";



const ContestCard = ({contest}) => {
    const history = useHistory();


    return(
        <Card id="cardBody">
            <CardContent>
                <h1> Title: {contest.title} </h1>
                {(contest.creator) &&
            <Button onClick={() => history.push(`/@${contest.creator}`)}>
              @{contest.creator}
            </Button>
          }             
                <p> Description: {contest.description} </p>
                <h3>{moment(contest.createdAt).fromNow()}</h3>
                <Button>Join</Button> <Button>Show Posts</Button>
            </CardContent>
        </Card>
    )
}

export default ContestCard;