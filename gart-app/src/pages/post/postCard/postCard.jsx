import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  // CardMedia,
  Button,
  Typography,
  // CardActionArea,
} from "@material-ui/core/";
import IconButton from '@material-ui/core/IconButton';
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import DeleteIcon from "@material-ui/icons/Delete";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faHeart, faHippo, faInfoCircle, faPenNib } from "@fortawesome/free-solid-svg-icons";
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




  const Refresh = () => {
    return Likes()
  }


  const Likes = () => {

    const [likeState, setLikeState] = useState({})
    useEffect(() => {
      setLikeState()
    }, [likeState])
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


  // const Likes = () => {
  //   if (post.likes.length >= 1) {
  //     // console.log(post.likes)
  //     post.likes.forEach(
  //       liker => {
  //         // console.log(liker, user?.result?.userID)
  //         // console.log("_")
  //         if (parseInt(liker) == parseInt(user?.result?.userID)) {
  //           return (<>
  //             {console.log("loved")}
  //             <FavoriteRoundedIcon fontSize="medium" />
  //             </>
  //           )
  //         }
  //       }
  //     )
  //   }

  //   return (
  //     <>
  //       <FavoriteBorderRoundedIcon fontSize="medium" />
  //   &nbsp;
  //     </>
  //   );


  // };

  return (
    <Card className={classes.card} id="cardBody">
      {/* <CardActionArea> */}
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
                post.tags.map((tag) => <>{`#${tag.trim()} `}</>)
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
              <Button
                size="small"
                color="secondary"
                disabled={user?.result.userID === parseInt(post.creator)}
                onClick={() => {
                  dispatch(likePost(post._id))
                  // refresh()
                }}
              >

                <Likes />
              </Button>
            </div>
          )}
        </div>
      </CardActions>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default PostCard;
