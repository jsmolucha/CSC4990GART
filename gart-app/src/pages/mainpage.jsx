// import React, { useState } from "react";
import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../constants/actionTypes';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles/main';
import Imagegrid from './imagegrid'
import "./styles/mainstyles.css"
import upload from "./images/upload.svg"
import logo from "./images/placeholder.svg"
import search from "./images/search.svg"

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

  
  // const data = localStorage.getItem('profile')
  // const [value, setValue] = React.useState(
  //   localStorage.getItem('profile') || ''
  // );


  return (
    <div className="containerMain">
      <div id="navigation">
        <div id="logoContainer">
          <img id='logoSVG' src={logo} alt=""/>
          <h3 id="logoText">GART</h3>
          <input id="searchBar" type="text" placeholder="Search"/>
        </div>
        <div id="searchContainer">
        </div>
      </div>
      <div id="leftmost">
        <div id="welcomeContainer">
          <h2 id="welcMsg">Welcome</h2>
          <button id="upload">
            <img id='uploadSVG' src={upload} alt=""/>
          </button>
          <div id="supportTextContainer"> 
            <p id="supportText"> We currently support PNG, JPEG, SVG, and some 3D formats.</p>
          </div>
          <div>
            <button id='explore'>Explore</button>
          </div>
          <div>
            <button id='favorites'>Favorite Posts</button>
          </div>
          <div>
            <button id='support'>Support</button>
          </div>
        </div>
      </div>
      <div id="middle"> 

      </div>
      <div id="rightmost">


      </div>
    </div>
  );
}

export default Mainpage;