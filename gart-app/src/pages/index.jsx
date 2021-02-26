import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "../../public/css/styles/index.css"
=======
import "./index.css"
>>>>>>> parent of d6b0e51 (changed folder structure)
//Functional Component 
  
const Welcome = () => {
  return (
    <div className="container">
      <div className="navigation">navbar here</div>
        <div className="logotype">GART </div>
        <div className="logopic">logo here</div>
        <div className="slogan">A creative forum for gaming art </div>
        <div className="loginflow">
          <Link to="/login" className="headertext_li">Login</Link>
        </div>
        <div className="signupflow">
          <Link to="/login" className="headertext_su">Signup</Link>
        </div>
    </div>
  );
};

export default Welcome;