import React from "react";
import Masonry from "react-masonry-css";
import { Box, Button, Container } from "@material-ui/core/";
import PostCard from "../post/postCard/postCard"
import { Redirect } from 'react-router-dom'

import * as api from "../../api/index.js";
import NavBar from "../Nav/navbar.jsx";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            images: [],
            setCurrentId: null,
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
          return <Redirect to={`/searchUsers/${this.state.query}`} />
        }
      }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("profile"));
        api.searchPost(this.state.query).then(
            (res) => {
                this.setState({
                    isLoaded: true,
                    images: res.data.reverse(),
                    setCurrentId: user.result.userID,
                    newSearch: false,
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
            default: 3,
            1100: 3,
            700: 2,
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
        } else  {

            return (
                <div className="profilePage">
                    <NavBar currentQuery={this.state.query}></NavBar>
                    <Box height="100%" >
                        <Box display="flex" justifyContent="center" m={2} p={1} >
                            <h1 className="welcomeMessage">Looking for "{this.state.query}"</h1>
                        </Box>
                        <Box display="flex" justifyContent="center" m={2} p={1} >
                        {this.renderRedirect()}
                            <Button color="primary" onClick={this.setRedirect}>Search for Users</Button>
                        </Box>
                    </Box>
                    <Box >
                        <Container>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                { this.state.images.map((p) => {
                                    return (
                                        <div key={p._id} style={{ backgroundColor: "transparent" }}>
                                            <PostCard post={p} setCurrentId={this.state.setCurrentId} />
                                        </div>
                                    );
                                })}
                            </Masonry>
                        </Container>
                    </Box > </div>
            )
        }

    }
}

export default Search