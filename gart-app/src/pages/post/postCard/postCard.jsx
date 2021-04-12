import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link, useHistory, useLocation } from "react-router-dom";
import { likePost, deletePost } from "../../../actions/post";
// '../../../actions/posts';
import useStyles from "./styles";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import EditIcon from '@material-ui/icons/Edit';
import ModalImage from "react-modal-image";
import "./fontFamily.css";
import axios from "axios";
import { API_URL } from "../../../constants/constants";
const PostCard = ({ post, setCurrentId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [username, setUsername] = useState({})

  
  useEffect(async () => {
    // POST request using axios inside useEffect React hook
    // const article = { title: 'React Hooks POST Request Example' };
    if (post.userID) {
      console.log(post.userID)
      await axios.get(`${API_URL}/api/accounts/creator/${post.userID}`)
        .then(response => setUsername(response.data));
      console.log(username)
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [username]);

  // setUsername = async () =>{
  //   username =  await axios.get(`${API_URL}/api/accounts/creator/${post.userID}`)
  // }
  // useEffect
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?.userID) ? (
        <>
          <FavoriteRoundedIcon fontSize="medium" />
          {/* &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` } */}
        </>
      ) : (
        <>
          <FavoriteRoundedIcon fontSize="medium" />
          {/* &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} */}
        </>
      );
    }

    return (
      <>
        <FavoriteBorderRoundedIcon fontSize="medium" />
        &nbsp;
      </>
    );
  };

  return (
    <Card className={classes.card} id="cardBody">
      {/* <CardActionArea> */}
      <ModalImage
        className={classes.modalImage}
        small={post.filePath}
        large={post.filePath}
        alt={post.description}
      />
      {/* <CardMedia
        className={classes.media}
        image={
          post.filePath ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      /> */}
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {/* {user?.result?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => setCurrentId(post._id)}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )} */}
      <CardContent>
        {/* <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography> */}
        {/* <Typography gutterBottom variant="h5" component="h2">? */}
        <h3>{post.title}</h3> 
        {/* <p>by <a href={}>@{()=>{ */}
        {/* // let username = axios.get(`${API_URL}/api/accounts/creator/${post.userID}`)}}</a></p> */}
        {/* </Typography> */}

        {post.description && (
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        )}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        {user?.result?.userID === parseInt(post?.creator) && (
          <Button
            size="small"
            // color="primary"
            onClick={() => history.push(`/edit/${post._id}`)}
          >
            <EditIcon fontSize="small" />
          </Button>
        )}

        {user?.result?.userID !== parseInt(post?.creator) && (
          <div className={classes.likeoverlay}>
            <Button
              size="small"
              color="secondary"
              disabled={!user?.result.userID === parseInt(post.creator)}
              onClick={() => {
                dispatch(likePost(post._id), console.log("like"));
              }}
            >
              <Likes />
            </Button>
          </div>
        )}
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default PostCard;
