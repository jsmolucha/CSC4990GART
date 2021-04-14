import React from "react";
import { Link } from "react-router-dom";
import "./styles/index.css"
import leftimage from "./images/comp1.svg"


const Welcome = () => {
  return (
    
    <div className="container-full">
      <div className="container-left">
        <div className="logo-name">GART </div>
          <hr className="line-div"></hr> 
        <div className="tag-line"> Join the hundreds of people sharing their passion for creating fan art!</div>
        <div className="register">
          <button className="register-button">
            <Link to="/register" className="register">REGISTER</Link>
          </button>
          
        </div>
        <div className="login-link">
          <Link to="/login" className="login">or log in with an existing account</Link>
        </div>
        
      </div>
      <div className="container-right">
        <img src={leftimage} alt=""/>
      </div>
    </div>
    
  );
};


export default Welcome;