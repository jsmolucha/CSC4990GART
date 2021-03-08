import React, {useState} from "react";
import axios from "axios"
//import { Link } from "react-router-dom";
import "./styles/login.css"




const Login = () => {
    const [user, setUser] = useState({});

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value});
        console.log(user)
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/user/login", {user}).then(data => console.log(data));
    }



    return (
        <div className="loginCont">
            <div className="logincontainer"> 
                <form className="loginForm" onChange={handleChange} onSubmit={handleSubmit}> 
                    <h1 id="loginHeader"> LOGIN</h1>
                    <input id="uEmailField" type="text" placeholder="Email" name="email" required />
                    <input id="pWordField" type="password" placeholder="Password" name="psw" required/>
                    <button id="submitLogin" type="submit">Login</button>
                    <p>Not registered? Sign up here!</p>
                </form>
            </div>
            <div className="loginGreeting">
                <h1 id="welcomeHeader">Welcome back,<span id="colorText"> creative!</span> </h1>
            </div>

        </div>
    );
};

export default Login;