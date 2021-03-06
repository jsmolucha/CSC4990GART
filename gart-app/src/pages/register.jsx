import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { signup } from '../actions/auth';
import "./styles/register.css"
import comp3 from "./images/comp3.svg"

const asyncHandler = require("express-async-handler");

const Registerpage  = () => {  
    const [user, setUser] = useState({});
//hir
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
};

const handleSubmit = asyncHandler(async (e) => {
    e.preventDefault();
    dispatch( signup(user, history));
})
   
  return (
    <div className="regContainer">
            <div className="registercontainer">
                <form className="regForm"  onChange={handleChange} onSubmit={handleSubmit}>
                    <h1 id="signupHeader"> SIGNUP</h1>
                    <p className="helper-text-register">for GART</p>
                    <input id="fullNameRegister" type="text" placeholder="Full Name" name="fname" required />
                    <input id="uNameRegister" type="text" placeholder="Username" name="uname" required />
                    <input id="eMailRegister" type="text" placeholder="Email" name="email" required/>
                    <input id="pWordRegister" type="password" placeholder="Password" name="psw" required/>
                    
                    <button id="submitReg" type="submit">REGISTER</button>
                    <div className="link-login">
                      <Link to="/login" id="haveAcct">Already with us? Log in now! </Link>
                    </div>
                </form>

            </div>
            <div className="registerGreeting">
              <img src={comp3} alt="" className="reg-image"/>
            </div>

        </div>
  );
};

export default Registerpage;