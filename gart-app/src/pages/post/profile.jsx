import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import Masonry from "react-masonry-css";
import { Box, Container } from "@material-ui/core/";
import NavBar from '../Nav/navbar'
import UserCard from "../search/card/userCard";
import * as api from "../../api/index.js"


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
      owner: null,
      setCurrentId: null,
      followers: [],
      currentUsername: null,
      followCount: null, 
      userInfo: {}
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    let user = JSON.parse(localStorage.getItem("profile"));
    document.title = username
    api.getUserInfo(username).then(
      (res) => {
          this.setState({
              userInfo: res.data,
          })
      },
      (error) => {
          console.log("error");
          this.setState({
              isLoaded: true,
              error,
          });
      }
  );
    
    axios
      .get(`http://localhost:5000/api/accounts/username/${username}`, {
        params: {
          // ID : user.result.userID
        },
      })
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            images: res.data.reverse(),
            owner: username,
            setCurrentId: user?.result?.userID,
            currentUsername: user?.result?.username,
            followCount: this.state.followers.length
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
    const breakpointColumnsObj = {
      default: 3,
      1100: 3,
      700: 2,
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

          <NavBar props={this.state.setCurrentId}></NavBar>
          <Box height="100%" >
            <Box display="flex" justifyContent="center" m={2} p={1} >
              <UserCard username={this.state.userInfo} currentUser={this.state.currentUsername} />

            </Box>  
            
            <Container>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {this.state.images.map((p) => {
                  return (
                    <div key={p._id} style={{ backgroundColor: "transparent" }}>
                      <PostCard post={p} setCurrentId={this.state.setCurrentId} />
                    </div>
                  );
                })}
              </Masonry>
            </Container>
          </Box>
        </div>
      );
    }
  }
}


export default Profile;
