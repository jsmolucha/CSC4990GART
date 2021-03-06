//this component renders the postcards of a users likes 
import React from "react";
import PostCard from "./postCard/postCard";
import Masonry from "react-masonry-css";
import { Box, Container } from "@material-ui/core/";
import NavBar from '../Nav/navbar'
import * as api from "../../api/index.js"

class LikedPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            images: [],
            owner: null,
            setCurrentId: null,
        };
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("profile"));
        console.log("user:", user?.result?.userID)

        api.getLikedPost({ "userID": user?.result?.userID }).then(
            (res) => {
                console.log(res.data, "response")
                this.setState({
                    isLoaded: true,
                    images: res.data.reverse(),
                    setCurrentId: user?.result?.userID,
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
        const { error, isLoaded, images } = this.state;
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
            return (<>
                <div className="profilePage">

                    <NavBar />
                    <Box>
                        <Box height="100%" >
                            <Box display="flex" justifyContent="center" m={2} p={1} >
                                <h1>View Your Likes</h1>

                            </Box>  </Box>
                        <Container>

                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {this.state.images.map((p) => {
                                    return (
                                        <div key={p._id} style={{ backgroundColor: "transparent" }}>
                                            <PostCard post={p} setCurrentId={this.state.setCurrentId} />
                                        </div>
                                    );
                                })}
                            </Masonry>
                        </Container>
                    </Box>
                </div>
            </>)

        }
    }
}


export default LikedPost;
