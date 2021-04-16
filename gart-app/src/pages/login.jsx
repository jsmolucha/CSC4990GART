
import React, { useState } from "react";
import "./styles/login.css";
import asset1 from "./images/splash.svg"
// import axios from "axios";

// This hook returns a reference to the dispatch function from the Redux store. 
// You may use it to dispatch actions as needed.
import { useDispatch } from 'react-redux'


//History https://reactrouter.com/web/api/history
import { Link, useHistory } from "react-router-dom";
import { signin } from '../actions/auth';
// import { AUTH } from '../constants/actionTypes';
import comp2 from "./images/comp2.svg"

//this may or may not be neccessary, tbd
const asyncHandler = require("express-async-handler");

const initialState = {  email: '', psw: ''};

const Login = () => {
    const [user, setUser] = useState({});
    //hir
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    };
    //asyncHandler is a module used to handle promises, was a lifesaver in Software engineering project -carlos
    const handleSubmit = asyncHandler(async (e) => {
        e.preventDefault();
        dispatch( signin(user, history));  //signin( user data, router/history)

        /** Old code, but useful to show logic on how log in works
         * New rendition splits the logic into multiple files
         * 
         * Will delete after demo
         * 
         try {
             //axios request
             //response == to whatever is inside res.send() in this case its token
             const response = await axios.post(
                 "http://localhost:5000/api/user/login",
                 { user }
                 ) //.then(data => console.log(data))
                 
                 dispatch({ type: AUTH, response.data });
                 localStorage.setItem("token", response.data); //temp, replace with sessions or whatever is used to store cookies and state
                 alert(
                     `SUCCESS! The server generated this token for you ${JSON.stringify(
                         response.data
                         )}\n Im not sure what to do with this information :/`
                         );
                         // router.push("/main")
                         window.location.replace("/main"); //simple redirect.. vanilla js 
        } catch (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                alert(error.response.data)
                console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
        }
        
        //needs to redirect to main... tba
        */
        
    });
    
    return (
        <div className="loginCont">
            
        <div className="logincontainer">
        <form
        className="loginForm"
        onChange={handleChange}
        onSubmit={handleSubmit}
        >
        <h1 id="loginHeader"> LOGIN</h1>
        <p className="helper-text">to GART</p>
        <input
                        id="uNameField"
                        type="text"
                        placeholder="Email"
                        name="email"
                        required
                    />
                    <input
                        id="pWordField"
                        type="password"
                        placeholder="Password"
                        name="psw"
                        required
                    />
                    <button id="submitLogin" className="rounded-corners-gradient-borders"  type="submit">LOGIN</button>
                </form>
                <div className="link-register">
                    <Link to="/register" id="noReg">New user? Register here!{" "}</Link>
                </div>
                
            </div>
            <div className="loginGreeting">
                <img src={comp2} alt="" className="image-2"/>
            </div>
        </div>
    );
};

export default Login;
