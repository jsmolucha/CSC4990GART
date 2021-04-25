import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { Link } from "react-router-dom";
import "../styles/update.css"

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
    <div className="updateContainer">
            <div className="regcontainer">
                <form className="regForm" method="post" action = "http://localhost:5000/api/update/updateAccount" onChange={handleInputChange}>
                    <h1 id="updateHeader"> Update Account</h1>
                    <input id="fullNameUpdate" type="text" placeholder="Full Name" value={data.fullName} name="fullName" required />
                    <input id="uNameUpdate" type="text" placeholder="Username" value={data.username}  name="username" required />
                    <input id="eMailUpdate" type="text" placeholder="Email" value={data.email} name="email" required/>
                    <input id="_id" type="hidden" value={data._id} name="_id" required/> 
                    <button id="submitReg" type="submit">Update Info</button>
                    <Link to="/@:username/passwordUpdate" id="haveAcct">Forgot your password?</Link>
                    <div></div>
                    <Link to="/@:username/accountDelete" id="haveAcct">You can remove you account here!</Link>
                </form>
            </div>
        </div>
  );
};

export default Profileupdate;