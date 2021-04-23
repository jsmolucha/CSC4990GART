import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import CommentCard from "./postCard/commentDisplay";
import Gallery from "react-grid-gallery";
import Masonry from "react-masonry-css";
import styles from "./styles.css";
import { Box, Container } from "@material-ui/core/";
import { sizing } from '@material-ui/system';

import NavBar from "../Nav/navbar"
// import Permalink from './permaPost';
// const { API_URL } = require('../constants/constants')

// const API = axios.create({ baseURL: `${API_URL}` });

class Permalink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {},
      comments:{},
      owner: null,
      setCurrentId: null,
    };
  }

  

  componentDidMount() {
    const { postId } = this.props.match.params;
    // console.log(username);
    let user = JSON.parse(localStorage.getItem("profile"));
    // console.log("user:", user)
    // console.log(this)
    axios
      .get(`http://localhost:5000/api/post/${postId}`, {
        params: {
          // ID : user.result.userID
        },
      })
      .then(
        (res) => {
           console.log(res.data,"response")
          this.setState({
            isLoaded: true,
            post: res.data.posts,
            comments: res.data.comments,
            // owner: username,
            setCurrentId: user.result.userID,
            //setCommentID: 
          });
        },
        (error) => {
          console.log("error");
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, post } = this.state;
    const breakpointColumnsObj = {
      default: 3,
      1100: 3,
      700: 2,
      500: 1,
  };
   
    // return(<div onLoad={componenetDidMount()}>
    //   Loading
    // </div>)

    // </div>
    // componenetDidMount()
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          Loading... ok
          {/* <div> {console.log(this.state)}</div> */}
        </div>
      );
    } else {
      return (
        <div className="profilePage">
          <NavBar />
          <Box display="flex" height={"100%"}>
            {/* <Container m={2}> */}
              {/* <Post post={post} setCurrentId={setCurrentId} /> */}
              {/* <Box width={0.5}  justifyContent="center" height='50%'>  */}
              <Box m={5} mx="auto" >
              <PostCard
                post={post}
                setCurrentId={this.state.setCurrentId}
                //comments = {this.state.comments}
              />
               {this.state.comments.map((c) => {
                        return (
                          <Box m={1}>
                            <div key={c._id} style={{ backgroundColor: "transparent" }}>
                                <CommentCard comment={c} />
                            </div>
                            </Box>
                        );
                    })}
              
              </Box>
          </Box>
        </div>
      );
    }
  }
}



export default Permalink;
