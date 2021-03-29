import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import Gallery from "react-grid-gallery";
import Masonry from "react-masonry-css";
import styles from './styles.css'
// const { API_URL } = require('../constants/constants')

// const API = axios.create({ baseURL: `${API_URL}` });

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: [],
      owner: null,
      setCurrentId: null,
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    console.log(username);
    let user = JSON.parse(localStorage.getItem("profile"));
    // console.log("user:", user)
    // console.log(this)
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
            images: res.data,
            owner: username,
            setCurrentId: user.result.userID,
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
      default: 5,
      1100: 3,
      700: 2,
      500: 1
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
        <div >
          <h1>Welcome to {this.state.owner}' profile page</h1>
          {/* <Post post={post} setCurrentId={setCurrentId} /> */}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {this.state.images.map((p) => {
              return (
                <div key={p._id} style={{backgroundColor: "#fff"}}>
                  <PostCard post={p} setCurrentId={this.state.setCurrentId} />
                  {/* <img key={p._id} src={p.filePath} alt={`${p.title} by ${p.creator}`} />;
        <h3>{`${p.title} by ${p.creator}`}</h3> */}
                </div>
              );
            })}
            </Masonry>
          {/* {console.log(this.state.images)} */}
        </div>
      );
    }
  }
}

/*
const Accountpage  = () => {

  let user = JSON.parse(localStorage.getItem('profile'));
  //getData()
  return (
    <div className="accountCont">
            <div className="accountcontainer">
            <div className="accountHead">
                <h1 id="welcomeHeader"> <span id="colorText">{user.result.username}'s Account</span> </h1>
                <div id="userPosts">This is where the user posts will go</div>
            </div>
                <Link to="/" id="toMain">Back to Exploring</Link>
            </div>
            

        </div>
  );
};
*/
export default Post;
