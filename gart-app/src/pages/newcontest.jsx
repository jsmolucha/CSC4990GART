import {createContest} from "../actions/contest.js"
import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch} from 'react-redux'
import "./styles/contest.css"

export default function Newcontest() {
    const user = JSON.parse(localStorage.getItem("profile"));

    const [contest, setContest] = useState({
        title: "", 
        description: "", 
        creator: user?.result?.username,
        category: "",

});

const dispatch = useDispatch();
const history = useHistory();

  const handleInputChange = (event) => {
    setContest({
      ...contest,
      [event.target.name]: event.target.value,
    });
    console.log(contest)
  };

  const handleSubmit = (async (e) => {
    e.preventDefault();
    dispatch( createContest(contest, history));
  });

return(
  <div className="root">
    <div className='container'>
      <h1 className="form-title" >GART</h1>
      <p className="form-helper-text">New contest submission form.</p>
        <form className="contestform"
        onChange={handleInputChange}
        onSubmit={handleSubmit}>
            <input name="title" className="title" placeholder="Title" />
            <input name="description" className="desc" placeholder="Description and details"  /> 
            <input name="category" placeholder="Categories" className='category-input' />
            <button className="submit-contest" type="submit">Submit</button>
        </form>
      </div>
    </div>

        )
};
