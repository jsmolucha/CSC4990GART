import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { signup } from '../actions/auth';
import "./styles/register.css"



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
    <div className="regCont">
            <div className="regcontainer">
                <form className="regForm"  onChange={handleChange} onSubmit={handleSubmit}>
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

export default Registerpage;