import React from "react";
import axios from "axios";
// import PostCard from "./postCard/postCard";
import Masonry from "react-masonry-css";
import { Box, Container } from "@material-ui/core/";
import searchPost from "../../actions/search.js"
import { useParams } from "react-router-dom";
import PostCard from "../post/postCard/postCard"

import * as api from "../../api/index.js";
import NavBar from "../Nav/navbar.jsx";
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            images: [],
            // owner: null,
            setCurrentId: null,
            followers: [],
            query: this.props.match.params.query,
            postSearch: true,
            userSearch: false,
            // currentUsername: null,
        };
    }

    
    componentDidMount() {
        console.log(this.props)
        const user = JSON.parse(localStorage.getItem("profile"));
        // const { query } = this.props.match.params

        // console.log()
        api.searchPost(this.state.query).then(
            (res) => {
                this.setState({
                    isLoaded: true,
                    images: res.data.reverse(),
                    setCurrentId: user.result.userID,
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
        } else if (this.state.postSearch && isLoaded) {

            return (
                <div className="profilePage">
                    <NavBar props={this.state.setCurrentId}></NavBar>
                    <Box height="100%" >
                        <Box display="flex" justifyContent="center" m={2} p={1} >
                            <h1 className="welcomeMessage">Looking for "{this.state.query}"</h1>
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