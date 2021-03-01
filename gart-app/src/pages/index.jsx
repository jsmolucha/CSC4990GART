import React from "react";
import { Link } from "react-router-dom";
import "./styles/index.css"
import logo from './images/placeholder.svg'


const Welcome = () => {
  return (
    
    <div className="container">
      
      <div className="logotype">GART </div>
      <div className="logopic">
        <img className="logoImg" src={logo} alt=""/>
      </div>
      <div className="slogan">A creative forum for gaming art </div>
      <div className="loginflow">
        <Link to="/login" className="headertext_li">LOGIN</Link>
      </div>
      <div className="signupflow">
        <Link to="/register" className="headertext_su">SIGNUP</Link>
      </div>
      <div className="statementMain"> Join the hundreds of people sharing their passion for creating fan art!</div>
    </div>
    
  );
};


export default Welcome;