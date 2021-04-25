//take params and use it to search for username on server
import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchPost } from "../../actions/search";
import PostCard from "../post/postCard/postCard";
const Search = ({ post, setCurrentId }) => {

    const [load, setLoad] = useState(false);
    const [answer, setAnswer] = useState([0])

    const [show, setShow] = useState(true)
    const [switchButton, setSwitchButton] = useState(["UN", "TGS"])
    const { query } = useParams();
    const user = JSON.parse(localStorage.getItem("profile"));

    const dispatch = useDispatch()

    function reRun() {
        setAnswer(answer)
        setLoad(true)

    }
    useEffect(
        async () => {
            if (load == false) {

                await dispatch(searchPost(query)).then(res => {
                    setAnswer(res)
                    console.log("data: ", res)
                    setLoad(true)
                })

            }

        }, [reRun]

    )

    useEffect(() => {
        if (load && answer.length > 0) {
            setShow(true)
        } else {
            setShow(false)
        }
    })
  
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1,
    };

    const PostFormatter = () => {
        if (load) {
            if (answer.length > 0) {
                {
                    answer.map((p) => {
                        <>
                            <h1>Post {p}</h1>
                            <div key={p._id} style={{ backgroundColor: "transparent" }}>
                                {console.log("post data: ", p)}
                                <PostCard post={p} setCurrentId={user?.result?.userID} />
                            </div>
                        </>
                    })
                }
            } else {
                return (<p>Nothing found</p>)
            }
        }

        return (
            <></>
        )
    }

    return (<>

        <Box>
            <><h1>Loaded</h1>

                <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    <PostFormatter />
                   
                </Masonry>
            </>

        </Box>

    </>)

}
export default Search;