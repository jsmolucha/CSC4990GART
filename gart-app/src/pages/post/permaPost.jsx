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
    let user = JSON.parse(localStorage.getItem("profile"));
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
            setCurrentId: user.result.userID
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
 
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          Loading... ok
        </div>
      );
    } else {
      return (
        <div className="profilePage">
          <NavBar />
          <Box display="flex" height={"100%"}>
              <Box m={5} mx="auto" >
              <PostCard
                post={post}
                setCurrentId={this.state.setCurrentId}
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
