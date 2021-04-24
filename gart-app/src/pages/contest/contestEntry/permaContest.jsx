//this file will render a conterst card based on the URL params
import React from "react";
import axios from "axios";
// import PostCard from "./postCard/postCard";
// import CommentCard from "./postCard/commentDisplay";
import Gallery from "react-grid-gallery";
import Masonry from "react-masonry-css";
import styles from "../../post/styles.css";
import { Box, Container } from "@material-ui/core/";
import { sizing } from '@material-ui/system';
import NavBar from "../../Nav/navbar";
import PostCard from "../../post/postCard/postCard";
import ContestCard from "../card/contestCard";
// import ContestCard from "../contestpage";

// import NavBar from "../Nav/navbar"


class PermaContest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contest: {},
            registeredPost: [],
            //   owner: null,
            setCurrentId: null,
        };
    }



    componentDidMount() {
        const { contestId } = this.props.match.params;
        let user = JSON.parse(localStorage.getItem("profile"));
        axios
            .get(`http://localhost:5000/api/contests/${contestId}`, {
                params: {
                    // ID : user.result.userID
                },
            })
            .then(
                (res) => {
                    console.log(res.data, "response")
                    this.setState({
                        isLoaded: true,
                        contest: res.data.contest,
                        registeredPost: res.data?.posts,
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
    //http://localhost:3000/constest-detail/608308600d1fe53c58f08afd
    render() {
        const { error, isLoaded, post } = this.state;
        const breakpointColumnsObj = {
            default: 2,
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
        } else {
            return (
                <div className="profilePage">
                    <NavBar />
                    <Box height="auto" >

                        {/* <Box m={5} mx="auto" > */}
                        <Box display="flex" justifyContent="center" m={2} p={1} >

                            <ContestCard contest={this.state.contest} />

                        </Box>
                        <Box display="flex" justifyContent="center" m={2} p={1} >
                        <h1 className="welcomeMessage">View All Submissions</h1>
                            </Box>

                        <Container>
                            {(this.state.registeredPost.length < 1) && (
                                <Box display="flex" justifyContent="center" m={2} p={1} >

                                    <h2 className="welcomeMessage">Be the First to Register!</h2>
                                </Box>
                            )}
                            {/* <Post post={post} setCurrentId={setCurrentId} /> */}
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {this.state.registeredPost.map((p) => {
                                    return (
                                        <Box m={1}>
                                            <div key={p._id} style={{ backgroundColor: "transparent" }}>
                                                <PostCard post={p} setCurrentId={this.state.setCurrentId} />
                                            </div>
                                        </Box>
                                    );
                                })}
                            </Masonry>
                        </Container>

                    </Box>
                </div>
            );
        }
    }
}



export default PermaContest;
