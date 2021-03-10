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
                    <input id="uNameField" type="text" placeholder="Email" name="email" required />
                    <input id="pWordField" type="password" placeholder="Password" name="psw" required/>
                    <button id="submitLogin" type="submit">Login</button>
                </form>
                <Link to="/register" id="noReg">Not registered? Sign up here! </Link>

            </div>
            <div className="loginGreeting">
                <h1 id="welcomeHeader">Welcome back,<span id="colorText"> creative!</span> </h1>
            </div>

        </div>
    );
};

export default Login;