import React from "react";
import Masonry from "react-masonry-css";
import { Box, Button, Container } from "@material-ui/core/";
import UserCard from "./card/userCard"
import { Redirect } from 'react-router-dom'
import * as api from "../../api/index.js";
import NavBar from "../Nav/navbar.jsx";

class SearchByUsername extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            setCurrentId: null,
            currentUser: null,
            followers: [],
            query: this.props.match.params.query,
            postSearch: true,
            userSearch: false,
            newSearch: true,
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
          return <Redirect to={`/search/${this.state.query}`} />
        }
      }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("profile"));
        api.searchUsername(this.state.query).then(
            (res) => {
                this.setState({
                    isLoaded: true,
                    users: res.data.reverse(),
                    setCurrentId: user.result.userID,
                    currentUser: user?.result?.username,
                    newSearch: false,
                    // query: query,
                })
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
        const { error, isLoaded, images } = this.state;
        const breakpointColumnsObj = {
            default: 1,
            1100: 2,
            700: 1,
            500: 1,
        };

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
                    <NavBar currentQuery={this.state.query}></NavBar>
                    <Box height="100%" >
                        <Box display="flex" justifyContent="center" m={2} p={1} >
                            <h1 className="welcomeMessage">Looking for "{this.state.query}"</h1>
                        </Box>
                        <Box display="flex" justifyContent="center" m={2} p={1} >
                        {this.renderRedirect()}
                            <Button color="primary" onClick={this.setRedirect}>Search by Post</Button>
                        </Box>
                    </Box>
                    <Box >
                        <Container>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {this.state.users.map((u) => {
                                    return (
                                        <div key={u._id} style={{ backgroundColor: "transparent" }}>
                                            <UserCard username={u} currentUser={this.state.currentUser}/>
                                        </div>
                                    );
                                })}
                            </Masonry>
                        </Container>
                    </Box > 
                    </div>
            )
        }

    }
}

export default SearchByUsername