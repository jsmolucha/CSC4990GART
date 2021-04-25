import React from "react";
import axios from "axios";
import PostCard from "./postCard/postCard";
import Masonry from "react-masonry-css";


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
        let user = JSON.parse(localStorage.getItem("profile"));
        axios
            .get(`http://localhost:5000/api/post/`, {
                params: {
                    // ID : user.result.userID
                },
            })
            .then(
                (res) => {
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
            default: 3,
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
