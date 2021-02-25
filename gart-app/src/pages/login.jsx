import React from "react";
//import { Link } from "react-router-dom";
import "./styles/login.css"


const login = () => {
    return (
        <div className="loginCont">
            <div className="logincontainer">
                <form className="loginForm" method="post">
                    <h1 id="loginHeader"> LOGIN</h1>
                    <p id="uNameText">Username</p>
                    <input id="uNameField" type="text" placeholder="Enter Username" name="uname" required />
                    <p id="pWordText">Username</p>
                    <input id="pWordField" type="password" placeholder="Enter Password" name="psw" required/>
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