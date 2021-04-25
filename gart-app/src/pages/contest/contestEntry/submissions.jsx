//this component will render the upload compnent and insert the contestID so that it will up
import React, { useEffect, useState } from "react";
import Upload from "../../upload/upload"
import { Box, Container } from "@material-ui/core";
import ContestCard from "../card/contestCard";
import * as api from '../../../api/index.js'
import { useParams } from "react-router-dom";



const Submission = () => {

    const [contest, setContest] = useState({})
    const { contestId } = useParams();
    const [load, setLoad] = useState(false)

    useEffect(
        () => {
            if (!load) {
                api.getSingleContest(contestId).then(
                    (res) => {
                        console.log("res.data ", res.data)
                        setContest(res.data)
                        setLoad(true)
                    }
                )
            }
        }
    )
    return (
        <Box display="flex" justifyContent="center" m="auto" style={{ height: "100vh", maxHeight: "100%", overflow: "auto" }} p={1} bgcolor="#151A21">
            <Box display="flex" justifyContent="center" m={2} p={1} >
                <ContestCard contest={contest} />

            </Box>
            <Box display="flex" justifyContent="center" m={2} p={1} >
                <Container>

                    <Upload setCurrentId={Date.now()} contestId={contest._id} />
                </Container>

            </Box>
        </Box>

    );
}
export default Submission;
