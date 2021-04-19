import React from "react";
import { Link } from "react-router-dom";
import "../styles/register.css"

const Profileupdate  = () => {
  return (
    <div className="regCont">
            <div className="regcontainer">
                <form className="regForm" method="post" action = "api/user/newUser">
                    <h1 id="signupHeader"> SIGNUP</h1>
                    <input id="fullName" type="text" placeholder="Full Name" name="fname" required />
                    <input id="uName" type="text" placeholder="Username" name="uname" required />
                    <input id="eMail" type="text" placeholder="Email" name="email" required/>
                    <input id="pWord" type="password" placeholder="Password" name="psw" required/>

                    <button id="submitReg" type="submit">Register</button>
                </form>
                <Link to="/login" id="haveAcct">Already with us? Log in now! </Link>

            </div>
            <div className="regGreeting">
                <h1 id="welcomeHeader">Start sharing your art<span id="colorText"> today!</span> </h1>
            </div>

        </div>
  );
};

export default Profileupdate;