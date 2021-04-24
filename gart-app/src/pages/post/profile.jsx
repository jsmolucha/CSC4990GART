import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import Masonry from "react-masonry-css";
import { Box, Container } from "@material-ui/core/";
import NavBar from '../Nav/navbar'
import FollowButton from './followButton'
import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   Button
// } from "@material-ui/core/";
// import { followUser } from '../../actions/auth'
// const { API_URL } = require('../constants/constants')

// const API = axios.create({ baseURL: `${API_URL}` });

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
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    let user = JSON.parse(localStorage.getItem("profile"));
    document.title = username
    axios.get(`http://localhost:5000/api/accounts/follow/${username}`)
      .then(
        (res) => {
          console.log(res.data, "response")
          this.setState({
            followers: res.data
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
    axios
      .get(`http://localhost:5000/api/accounts/username/${username}`, {
        params: {
          // ID : user.result.userID
        },
      })
      .then(
        (res) => {
          // console.log(res.data,"response")
          this.setState({
            isLoaded: true,
            images: res.data.reverse(),
            owner: username,
            setCurrentId: user.result.userID,
            currentUsername: user?.result?.username,
            followCount: this.state.followers.length
            // followers: user?.result?.followers
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
          {/* <title>{ this.state.owner }</title> */}

          <NavBar props={this.state.setCurrentId}></NavBar>
          <Box height="100%" >
            <Box display="flex" justifyContent="center" m={2} p={1} >
              <h1 className="welcomeMessage">@{this.state.owner}</h1>

            </Box>  
            {(this.state.owner != this.state.currentUsername) && (
              <Box display="flex" justifyContent="center"  >
                <FollowButton username={this.state.owner} followers={this.state.followers}
                  userID={this.state.setCurrentId}  />
              </Box>)}
            <Box display="flex" justifyContent="center" m={1} p={1} >
              {/* <Container justifyContent="center" m={2}> */}
              {/* <h1 className="welcomeMessage">@{this.state.owner}</h1> */}
              <h4>this user has {this.state.followCount} {
                (this.state.followCount=== 1) ? ("follower") : ("followers")
              }</h4>
              {/* <h4>If we wanted to add user bio we can place it here</h4> */}
              {/* </Container> */}
            </Box>
            <Container>
              {/* <Post post={post} setCurrentId={setCurrentId} /> */}
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {this.state.images.map((p) => {
                  return (
                    <div key={p._id} style={{ backgroundColor: "transparent" }}>
                      <PostCard post={p} setCurrentId={this.state.setCurrentId} />
                      {/* <img key={p._id} src={p.filePath} alt={`${p.title} by ${p.creator}`} />;
        <h3>{`${p.title} by ${p.creator}`}</h3> */}
                    </div>
                  );
                })}
              </Masonry>
              {/* {console.log(this.state.images)} */}
            </Container>
          </Box>
        </div>
      );
    }
  }
}


export default Profile;
