import React, { useEffect, useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
  } from "@material-ui/core/";

import { useHistory, useLocation } from "react-router-dom";


const CommentCard = ({comment}) => {

    const history = useHistory();

    return(
        <Card id="cardBody">
            <CardContent>
                <h3>
                {(comment.username) &&
            <Button onClick={() => history.push(`/@${comment.username}`)}>
              @{comment.username}
            </Button>
          }
                </h3>
                {comment.comment && (
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.comment}
          </Typography>
        )}
            </CardContent>
        </Card>
    )

}
export default CommentCard;