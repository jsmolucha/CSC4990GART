import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { accountInfo } from '../actions/auth';

const asyncHandler = require("express-async-handler");

const Accountpage  = () => {

  let user = JSON.parse(localStorage.getItem('profile'));
  //const history = useHistory();
  const dispatch = useDispatch();

  const getData = asyncHandler(async (e) => {
    e.preventDefault();
    dispatch(accountInfo(user));

  });

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

export default Accountpage;