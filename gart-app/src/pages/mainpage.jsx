import React, { useState } from "react";
import { Link } from "react-router-dom";

/* We simply can use an array and loop and print each user */
const mainpage  = () => {

  // const data = localStorage.getItem('profile')
  // const [value, setValue] = React.useState(
  //   localStorage.getItem('profile') || ''
  // );
  
  return (
    <div>
      <h1>this is where the content will go</h1>
      <ul>
        <li>{localStorage.getItem('profile')}</li>
      </ul>
      <Link to="/">back to welcome</Link>
    </div>
  );
};

export default mainpage;