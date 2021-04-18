import React, { useEffect, useState } from "react";
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
import { likePost } from "../../../actions/post";
// '../../../actions/posts';
import useStyles from "./styles";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ModalImage from "react-modal-image";
import "./fontFamily.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHeart, faHippo, faInfoCircle, faPenNib } from "@fortawesome/free-solid-svg-icons";
import Heart from './Heart'

const PostCard = ({ post, setCurrentId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [likeUser, setLikeUser] = useState(post.likes)

  useEffect(() => {
    // console.log(likeUser, post.title)
    for(const uid of likeUser){
      if(parseInt(uid) !== parseInt(user?.result?.userID)){
          post.likes.shift()
      }else{
        // console.log(">>>",uid)
        setLikeUser([uid])
        break;
      }
  }
  },[])
  // const [isClick, setClick] = useState(false);

  const Likes = () => {



    if (post.likes.length > 0) {
      return post.likes.find((like) => parseInt(like) === parseInt(user?.result?.userID)) ? (
        <>
          <FavoriteRoundedIcon fontSize="large" />
          {/* <FontAwesomeIcon icon={faHeart}  /> */}
          {/* &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` } */}
        </>
      ) : (
        <>
          <FavoriteBorderRoundedIcon fontSize="large" />
          {/* &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} */}
        </>
      );
    }
    return (
      <>
        <FavoriteBorderRoundedIcon fontSize="large" />
        &nbsp;
      </>
    );

  };

  // const [buttonText, setButtonText] = useState(<Likes />);

  // useEffect(()=>{
  //   setButtonText(<Likes />)
  // },[buttonText])



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
            // color="primary"
            onClick={() => history.push(`/edit/${post._id}`)}
          >
            {/* <EditIcon fontSize="small" /> */}
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
              {/* postId, userID , creator, likes */}
              {/* <Heart postId={post._id} userID={user?.result?.userID} creator={post.creator} likes={post.likes}  /> */}

              
              <Heart PID={post._id} likes={post.likes} userID={user?.result?.userID} />
              {/* <Button
                size="small"
                color="secondary"
                disabled={user?.result.userID === parseInt(post.creator)}
                onClick={() => {
                  dispatch(likePost(post._id))
                  // setClick(!isClick)
                  // refresh()
                }
                }

              >

                <Likes />

              </Button> */}
            </div>
          )}
        </div>
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default PostCard;
