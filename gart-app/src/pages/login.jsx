import React from "react";
import { Link } from "react-router-dom";
/* We simply can use an array and loop and print each user */
const loginpage  = () => {
  return (
    <div>
      <h1>this is the login page</h1>
      <Link to="/">back to home</Link>
    </div>
  );
};

export default loginpage;