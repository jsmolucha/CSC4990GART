import React from "react";
//import { Link } from "react-router-dom";
import "./styles/login.css"


const login = () => {
    return (
        <div className="loginCont">
            <div className="logincontainer">
                <form className="loginForm" method="post" action = "api/user/login">
                    <h1 id="loginHeader"> LOGIN</h1>
                    <input id="uEmailField" type="text" placeholder="Email" name="email" required />
                    <input id="pWordField" type="password" placeholder="Password" name="psw" required/>
                    <button id="submitLogin" type="submit">Login</button>
                </form>
            </div>
            <div className="loginGreeting">
                <h1 id="welcomeHeader">Welcome back, creative!</h1>
            </div>

        </div>
    );
};

export default login;