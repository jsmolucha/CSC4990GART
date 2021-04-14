import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import Masonry from "react-masonry-css";
import { Box, Container } from "@material-ui/core/";
import NavBar from '../Nav/navbar'
// const { API_URL } = require('../constants/constants')

// const API = axios.create({ baseURL: `${API_URL}` });

class MainPost extends React.Component {
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
        // const { username } = this.props.match.params;
        // console.log(username);
        let user = JSON.parse(localStorage.getItem("profile"));
        // console.log("user:", user)
        // console.log(this)
        axios
            .get(`http://localhost:5000/api/post/`, {
                params: {
                    // ID : user.result.userID
                },
            })
            .then(
                (res) => {
                    // console.log(res.data,"response")
                    this.setState({
                        isLoaded: true,
                        images: res.data.reverse(),
                        // owner: username,
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
            default: 3,
            1100: 3,
            700: 2,
            500: 1,
        };
        // return(<div onLoad={componenetDidMount()}>
        //   Loading
        // </div>)

        // </div>
        // componenetDidMount()
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div>
                    Loading... ok
                    {/* <div> {console.log(this.state)}</div> */}
                </div>
            );
        } else {
            return (

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
                </Masonry>)

        }
    }
}


export default MainPost;
