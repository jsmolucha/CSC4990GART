import React from "react";
import { Link } from "react-router-dom";
/* We simply can use an array and loop and print each user */
const mainpage  = () => {
  return (
    <div>
      <h1>this is where the content will go</h1>
      <Link to="/">back to welcome</Link>
    </div>
  );
};

export default mainpage;