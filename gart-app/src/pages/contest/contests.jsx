import React from "react";
import '../styles/contest.css'
import axios from 'axios';
import { Box, Button } from "@material-ui/core/";
import NavBar from '../Nav/navbar'
import { Redirect } from 'react-router-dom'
import ContestCard from "./card/contestCard"


class Contest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Contest: [],
      owner: null,
      setCurrentId: null,
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/newContest' />
    }
  }



  componentDidMount() {

    let user = JSON.parse(localStorage.getItem("profile"));
    axios
      .get(`http://localhost:5000/api/contests/getContest`, {
        params: {
        },
      })
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            Contest: res.data.reverse(),
            setCurrentId: user.result.userID
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, Contest } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          Loading... ok
        </div>
      );
    } else {
      return (
        <div className="profilePage">
          <NavBar props={this.state.setCurrentId}></NavBar>
          <Box height="100%" >
            <Box display="flex" justifyContent="center" m={2} p={1} >
              <h1 className="welcomeMessage">Welcome to the Contests Page</h1>
            </Box>
            <Box display="flex" justifyContent="center" m={2} p={1} >
              {this.renderRedirect()}
              <Button variant="contained" color="secondary"onClick={this.setRedirect}> Create Contest</Button>
            </Box>
          </Box>
          <Box display="flex" height={"100%"}>
            <Box m={5} mx="auto" >

              {this.state.Contest.map((c) => {
                return (
                  <Box m={1}>
                    <div key={c._id} style={{ backgroundColor: "transparent" }}>
                      <ContestCard contest={c} />
                    </div>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </div>
      );
    }
  }
}
export default Contest;