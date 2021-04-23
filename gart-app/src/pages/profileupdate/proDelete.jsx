import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { Link } from "react-router-dom";
import "../styles/register.css"

const AccountDelete  = () => {
    const [data, setData] = useState([]);  
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(async() => {   
        const formData = new FormData();
        console.log(user?.result?.userID)
        await
        Axios  
            .post("http://localhost:5000/api/update/populateDelete", {
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
                <form className="regForm" method="post" action = "http://localhost:5000/api/update/deleteAccount" onChange={handleInputChange}>
                    <h1 id="signupHeader"> Delete Account</h1>
                    <input id="_id" type="hidden" value={data._id} name="_id" required/> 
                    <input id="userID" type="hidden" value={data.userID} name="userID" required/> 
                    <input id="username" type="hidden" value={data.username} name="username" required/> 

                    <button id="submitReg" type="submit">Delete Account</button>
                </form>

            </div>
            <div className="regGreeting">
                <h1 id="welcomeHeader">Start sharing your art<span id="colorText"> today!</span> </h1>
            </div>

        </div>
  );
};

export default AccountDelete;