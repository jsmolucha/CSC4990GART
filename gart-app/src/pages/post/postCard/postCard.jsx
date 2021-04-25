import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core/";
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from "react-redux";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import ModalImage from "react-modal-image";
import "./fontFamily.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Heart from './Heart'
import Comment from './comment'
import Medal from "../../contest/card/Medal"
const PostCard = ({ post, setCurrentId, contestObject = {} }) => {
  const history = useHistory();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));


  return (
    <Card className={classes.card} id="cardBody">
      <ModalImage
        className={classes.modalImage}
        small={post.filePath}
        large={post.filePath}
        alt={post.description}
      />

      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <CardContent>

        <h3>{post.title}
          {(post.username) &&
            <Button onClick={() => history.push(`/@${post.username}`)}>
              @{post.username}
            </Button>
          }
        </h3>
        {post.description && (
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.tagContainer}>

          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {
                post?.tags?.map((tag) => <>{`#${tag.trim()} `}</>)
              }
            </Typography>
          </div>
        </div>

        {user?.result?.userID === parseInt(post?.creator) && (
          <Button
            size="small"
            onClick={() => history.push(`/edit/${post._id}`)}
          >
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </Button>
        )}
        <div className={classes.postButton}>
        

          <IconButton edge="start" color="inherit" aria-label="menu"
            onClick={() => {
              history.push(`/post/${post._id}`)
            }}>
            <FontAwesomeIcon icon={faInfoCircle} />
          </IconButton>

          {user?.result?.userID !== parseInt(post?.creator) && (
            <div className={classes.likeoverlay}>

              {(!(contestObject && Object.keys(contestObject).length === 0 && contestObject.constructor === Object)) && 
              (<Medal contestObject={contestObject} userID={user?.result?.userID} />)}
              <Heart PID={post._id} likes={post.likes} userID={user?.result?.userID} />
              <Comment PID = {post._id} userID={user?.result?.userID} username={user?.result?.username} />
              
            </div>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default PostCard;
