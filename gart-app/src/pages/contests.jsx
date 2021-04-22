import React from "react";
import './styles/contest.css'
import axios from 'axios';
const { API_URL } = require('../constants/constants')

const API = axios.create({ baseURL: `${API_URL}` });
/* 
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
      };
    }
 */

/* 
async function startContest(newcontest) {
    const response = await fetch("/api/contests", 
        {method: "POST", 
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({Contest: newcontest}),
    })
    const{Contest}= await response.json();
    return Contest;
}

export default function query() {
    const {data: Contest, error} = useQuery("Contest", fetchContest)
}
 */

const Contest = () => {
    return (
        <div>
            <h1>this is where contests are hosted</h1>
            <button>new contest</button>
            <div>new contests</div>
        </div>
       
    )
}
export default Contest;