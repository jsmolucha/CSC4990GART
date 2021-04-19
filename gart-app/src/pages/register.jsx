import React from "react";
import { Link } from "react-router-dom";
import "./styles/register.css"
import comp3 from "./images/comp3.svg"

const registerpage  = () => {
  return (
    <div className="regCont">
            <div className="regcontainer">
                <form className="regForm" method="post" action = "api/user/newUser">
                    <h1 id="signupHeader"> SIGNUP</h1>
                    <p className="helper-text-signup">for GART</p>

                    <input id="fullName" type="text" placeholder="Full Name" name="fname" required />
                    <input id="uName" type="text" placeholder="Username" name="uname" required />
                    <input id="eMail" type="text" placeholder="Email" name="email" required/>
                    <input id="pWord" type="password" placeholder="Password" name="psw" required/>

                    <button id="submitReg" type="submit">REGISTER</button>
                    <div className="link-login">
                      <Link to="/login" id="haveAcct">Already with us? Log in now! </Link>
                    </div>
                </form>

            </div>
            <div className="regGreeting">
              <img src={comp3} alt="" className="reg-image"/>
            </div>

        </div>
  );
};

export default registerpage;