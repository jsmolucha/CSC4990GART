import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core/";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../actions/post.js"
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./styles";
const CommentCard = ({ comment, userID }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Card  >
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
      <CardActions className={classes.cardActions}>

      <div className={classes.postButton}>

        {(comment.commentBy === userID) &&(<IconButton
          // style={{ margin: 5 }}
          // variant="contained"
          color="secondary"
          // color="primary"
          onClick={() => {
            dispatch(deleteComment(comment._id))
            history.go(0)
          }
        }
        >
          <DeleteIcon fontSize="small" />
          {/* <EditIcon fontSize="small" /> */}
        </IconButton>)}
          </div>
      </CardActions>
    </Card>
  )

}
export default CommentCard;