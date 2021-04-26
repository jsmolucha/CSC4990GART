import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { Link } from "react-router-dom";
import "../styles/passupdate.css"

const Passwordupdate  = () => {
    const [data, setData] = useState([]);  
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(async() => {   
        const formData = new FormData();
        console.log(user?.result?.userID)
        await
        Axios  
            .post("http://localhost:5000/api/update/populatePass", {
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
    <div className="passUpdate">
            <div className="passContainer">
                <form className="regForm" method="post" action = "http://localhost:5000/api/update/updatePassword" onChange={handleInputChange}>
                    <h1 id="updateHeader"> Update Account</h1>
                    <input id="passUpdateField" type="password" placeholder="Enter New Password Here"  name="password" required/>
                    <input id="_id" type="hidden" value={data._id} name="_id" required/> 
                    <input id="usernameUpdate" type="hidden" value={data.username} name="username" required/> 
                    <button id="submitNewPassword" type="submit">Change Password</button>
                </form>
            </div>
        </div>
  );
};

export default Passwordupdate;