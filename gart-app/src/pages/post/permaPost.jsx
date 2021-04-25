import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import CommentCard from "./postCard/commentDisplay";
import Masonry from "react-masonry-css";
import { Box } from "@material-ui/core/";

import NavBar from "../Nav/navbar"


class Permalink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {},
      comments: {},
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
    const breakpointColumnsObj = {
      default: 1,
      1100: 1,
      700: 1,
      500: 1,
    };
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
          <Box display="flex" justifyContent="center" m="auto" style={{ height: "auto", minHeight: "100%", overflow: "auto" }} p={1} bgcolor="#151A21">
            <Box m={5}>

              <PostCard
                post={post}
                setCurrentId={this.state.setCurrentId}
              />
            </Box> 

              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {this.state.comments.map((c) => {
                  return (
                    <Box m={5}>
                      <div key={c._id} style={{ backgroundColor: "transparent", width: "auto" }}>
                        <CommentCard comment={c} userID={this.state.setCurrentId} />
                      </div>
                    </Box>
                  );
                })}
              </Masonry>
          </Box>
        </div>
      );
    }
  }
}



export default Permalink;
