import React from "react";
import { Link } from "react-router-dom";
//Functional Component 
const Welcome = () => {
  return (
    <div>
      <h1>OK so this is the welcome page </h1>
      <h3>WELCOME PAGE</h3>
      <Link to="/main">come on in</Link>
    </div>
  );
};

export default Welcome;