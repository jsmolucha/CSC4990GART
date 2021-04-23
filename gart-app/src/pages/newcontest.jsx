//form would go here
import {createContest} from "../actions/contest.js"
import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch} from 'react-redux'



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
    <div>
        <form className="contestform"
        onChange={handleInputChange}
        onSubmit={handleSubmit}>
            <input name="title" className="title" placeholder="title" />
            <input name="description" className="desc" placeholder="description"  /> 
            <input name="category" placeholder="category" />
            <button className="submit-contest" type="submit">Submit</button>
        </form>
    </div>

        )
};
