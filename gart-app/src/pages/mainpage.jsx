// import React, { useState } from "react";
import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../constants/actionTypes';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles/main';
import Gallery from 'react-grid-gallery';
import IMAGES from "./IMAGES"
import ReactDOM from 'react-dom';
import Imagegrid from './imagegrid'

/* We simply can use an array and loop and print each user */
const Mainpage  = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();


  const logout = () => {

    dispatch({ type: actionType.LOGOUT });

    history.push('/main');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  

  /* setTimeout(() => {
    ReactDOM.render(<Gallery images={IMAGES}/>, document.getElementById('app'));
  }, 25); */

  
  // const data = localStorage.getItem('profile')
  // const [value, setValue] = React.useState(
  //   localStorage.getItem('profile') || ''
  // );
  
  return (
    <div>
       {user?.result ? (
          <div>
            <h1>You are logged in.</h1>
            <ul>
              <li>Username: {user?.result.username}</li>
              <li>ID: {user?.result._id}</li>
              <li>Email: {user?.result.email}</li>
            </ul>
            {/* <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar> */}
            {/* <Typography className={classes.userName} variant="h6">{user?.result.username}</Typography> */}
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className={classes.appBar2}>
            <Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>
            <h1>You are not logged in!</h1>
          </div>
        )}
      <Link to="/">back to welcome</Link>
      <div id='app'>
        <Imagegrid/>
      </div>
    </div>
  );
};

export default Mainpage;