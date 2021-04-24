//this component will render the upload compnent and insert the contestID so that it will up
import React, { useEffect, useState } from "react";
import Upload from "../../upload/upload"
import { Box, Grid } from "@material-ui/core";
import ContestCard from "../contestpage";
import * as api from '../../../api/index.js'
import { useParams } from "react-router-dom";



const Submission = () => {

    const [contest, setContest] = useState({})
    const {contestId} = useParams();
    const [load, setLoad] = useState(false)

    useEffect(
        ()=>{
            if(!load)
            {api.getSingleContest(contestId).then(
                (res) =>{
                    console.log("res.data ", res.data)
                    setContest(res.data)
                    setLoad(true)
                }
            )
        }
    }
)
    return (
<div className="registerPage">
        <Box display="flex" justifyContent="center" m="auto" style={{ height: "auto", maxHeight: "100%", overflow: "auto" }} p={1}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <ContestCard contest={contest}  />
                </Grid>
                <Grid item xs={6}>
                    <Upload setCurrentId={Date.now()} contestId={contest._id}></Upload>

                </Grid>
            </Grid>
        </Box>
</div>
    );
}
export default Submission;