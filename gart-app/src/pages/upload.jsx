import React from "react";
import Upload from "./upload/upload"
import {Box} from "@material-ui/core";

import "./contest/card/card.scss"

const UploadPage = () => {

  return (

    <Box display="flex" justifyContent="center" m="auto" style={{ height: "100vh", maxHeight: "100%", overflow: "auto" }} p={1} bgcolor="#151A21">
        <Upload setCurrentId={Date.now()}></Upload>
    </Box>
  );
}
  export default UploadPage;