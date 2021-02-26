import React from "react";
import { Link } from "react-router-dom";
//Functional Component 
const error = () => {
  return (
    <div>
      <h1>404 error</h1>
      <h3>this is not the page you are looking for</h3>
      <Link to="/">back to orbit</Link>
    </div>
  );
};

export default error;