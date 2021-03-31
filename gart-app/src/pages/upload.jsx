import React from "react";
import Upload from "./upload/upload"
import {Box} from "@material-ui/core";


const UploadPage = () => {

  return (

    <Box display="flex" justifyContent="center" m="auto" style={{ height: "100vh", maxHeight: "100%", overflow: "auto" }} p={1} bgcolor="#4f4f4d">
        <Upload setCurrentId={Date.now()}></Upload>
    </Box>
  );
}
  export default UploadPage;