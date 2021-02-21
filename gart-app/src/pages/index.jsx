import React from "react";
import { Link } from "react-router-dom";
import "./index.css"
//Functional Component 
const Welcome = () => {
  return (
    <div className="container">
        <div className="logotype">GART </div>
        <div className="logopic">logo here</div>
        <div className="slogan">A creative forum for gaming art </div>
        <div className="loginflow"> already with us? login!</div>
        <div className="signupflow"> new here? signup!</div>
        <Link className="backmain" to="/main">come on in</Link>
    </div>
  );
};

export default Welcome;