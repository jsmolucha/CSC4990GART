import React from "react";
import './styles/contest.css'
import axios from 'axios';
import ContestCard from "./contest/contestpage"
import { Box, Container } from "@material-ui/core/";



class Contest extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        Contest: [],
        owner: null,
        setCurrentId: null,
      };
    }
  
    componentDidMount() {
      
      let user = JSON.parse(localStorage.getItem("profile"));
      axios
        .get(`http://localhost:5000/api/contests/getContest`, {
          params: {
            // ID : user.result.userID
          },
        })
        .then(
          (res) => {
             console.log(res.data,"response")
            this.setState({
              isLoaded: true,
              Contest: res.data,
              setCurrentId: user.result.userID
            });
          },
          (error) => {
            console.log("error");
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