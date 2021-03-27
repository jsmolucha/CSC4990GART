import React from "react";
import axios from 'axios';
const { API_URL } = require('../constants/constants')


const API = axios.create({ baseURL: `${API_URL}` });

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
}


componenetDidMount() {
  let user = JSON.parse(localStorage.getItem('profile'));
  axios.get('http://localhost:5000/api/accounts/userPosts', {
        params: {
          ID : user.result.userID
        }
  })
    .then( res => {
        this.setState({
          isLoaded: true,
          images: res.data
        });
      }, 
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}

render() {
  const { error, isLoaded, images } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  else {
    return <div> {this.state.images.title}</div>
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
export default MyComponent; 