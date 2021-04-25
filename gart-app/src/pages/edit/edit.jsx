import React from "react";
import axios from "axios";
import { Box, Container } from "@material-ui/core/";
import EditPost from './editPost/editPost'

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: {},
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
            images: res.data.posts,
            owner: res.data?.posts.creator,
            setCurrentId: user?.result?.userID,
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
    const { error, isLoaded, images } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (parseInt(this.state.owner) !== parseInt(this.state.setCurrentId) ) {
      return (
        <div>
          <h1>Sorry, You dont have permision</h1>
          <p>{this.state.owner}</p>
          <p>{this.state.setCurrentId}</p>
          <div></div>
        </div>
      );
    } else {
      return (
        <Box display="flex" justifyContent="center" m="auto" style={{ height: "100vh", maxHeight: "100%", overflow: "auto" }} p={1} bgcolor="#151A21">
            <EditPost image={this.state.images} currentId={this.state.setCurrentId}></EditPost>
        </Box>
      );
    }
  }
}


export default Edit;
