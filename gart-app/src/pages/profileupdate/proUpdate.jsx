import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { Link } from "react-router-dom";
import "../styles/register.css"

const Profileupdate  = () => {
    const [data, setData] = useState([]);  
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(async() => {   
        const formData = new FormData();
        console.log(user?.result?.userID)
        await
        Axios  
            .post("http://localhost:5000/api/update/populateInfo", {
                "userID" : user?.result?.userID
              })  
            .then(result => {setData(result.data)
            console.log(result)});  
        console.log(data);   
    }, []);  
    const handleInputChange = (event) => {
        setData({
          ...data,
          [event.target.name]: event.target.value,
        });
      };
  return (
    <div className="regCont">
            <div className="regcontainer">
                <form className="regForm" method="post" action = "http://localhost:5000/api/update/updateAccount" onChange={handleInputChange}>
                    <h1 id="signupHeader"> SIGNUP</h1>
                    <input id="fullName" type="text" placeholder="Full Name" value={data.fullName} name="fullName" required />
                    <input id="uName" type="text" placeholder="Username" value={data.username}  name="username" required />
                    <input id="eMail" type="text" placeholder="Email" value={data.email} name="email" required/>
                    <input id="_id" type="hidden" value={data._id} name="_id" required/> 

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