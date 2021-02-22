import React from "react";
import { Link } from "react-router-dom";
import "./index.css"
//Functional Component 
  
const Welcome = () => {
  return (
    <div className="container">
      <div className="navigation">navbar here</div>
        <div className="logotype">GART </div>
        <div className="logopic">logo here</div>
        <div className="slogan">A creative forum for gaming art </div>
        <div className="loginflow">
          <h3 className="primertext_li">Already with us?</h3>
          <h1 className="headertext_li">Log in!</h1>
        </div>
        <div className="signupflow">
          <h3 className="primertext_su">New here?</h3>
          <h1 className="headertext_su">Sign up!</h1>
        </div>
        <Link className="backmain" to="/main"></Link>
    </div>
  );
};

export default Welcome;