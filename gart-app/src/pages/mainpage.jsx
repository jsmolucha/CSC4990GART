import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../constants/actionTypes';
import useStyles from './styles/main';
import Imagegrid from './imagegrid'
import "./styles/mainstyles.css"
import upload from "./images/upload.svg"
import logo from "./images/placeholder.svg"
import search from "./images/search.svg"
import Upload from "./upload/upload.jsx"

import NavBar from './Nav/navbar'
import MaintPost from './post/mainPost';

/* We simply can use an array and loop and print each user */
const Mainpage  = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const logout = () => {

    dispatch({ type: actionType.LOGOUT });
    history.push('/');
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

      <NavBar props={user}></NavBar>
    </div>
      {/* <div id="navigation">
        <div id="logoContainer">
          <img id='logoSVG' src={logo} alt=""/>
          <h3 id="logoText">GART</h3>
          <input id="searchBar" type="text" placeholder="Search"/>
        </div>
        <div id="searchContainer">
        </div>

      </div> */}
      <div id="leftmost">
        <div id="welcomeContainer">
          <h2 id="welcMsg">Welcome</h2>
          <button id="upload" >
            <Link to="/upload">
              <img id='uploadSVG' src={upload} alt=""/>
            </Link>
          </button>
          <div id="supportTextContainer"> 
            <p id="supportText"> We currently support PNG, JPEG, SVG, and some 3D formats.</p>
          </div>
          <div>
            <button id='explore'>
            <Link to="/contests" id='loginlink'> Contests</Link></button>
          </div>
          <div>
            <button id='favorites'>
              <Link to="/likes" id='loginlink'> Favorite Posts</Link></button>
          </div>
          <div>
            <button id='support'>Support</button>
          </div>
          <div>
            <button id='logout' onClick={logout}>Log Out</button>
          </div>
        </div>
      </div>
      <div id="middle"> 
      <MaintPost></MaintPost>
      </div>
    </div>
  );
}
export default Mainpage;