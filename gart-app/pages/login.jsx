import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD:gart-app/pages/login.jsx
import "../public/css/login.css"
import "./styles/login.css"

=======
import "./login.css"
>>>>>>> parent of d6b0e51 (changed folder structure):gart-app/src/pages/login.jsx

/* We simply can use an array and loop and print each user */
const loginpage  = () => {
  return (
    <div>
      <h1>this is the login page</h1>
      <form method="post">
        <div className="loginContainer">

          <label for="uname"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="uname" required />

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required />

          <button type="submit">Login</button>

        </div>
      </form>
      <Link to="/">back to home</Link>
    </div>
  );
};

export default loginpage;