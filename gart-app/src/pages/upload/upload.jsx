import React, { useState, useRef, useEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";

import { createPost } from "../../actions/post";
// import "../styles/styles.css"
// import Box from "@material-ui/core/Box";
import {
  Box,
  Container,
  Grid,
  TextField,
  withStyles,
  Paper,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { Form, Row, Col, Button } from 'react-bootstrap';
// import './styles.scss';

// const useStyles = makeStyles((theme) => ({
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 275,
    maxWidth: 500,
    // flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    //  width: 200,
  },
  card: {
    minHeight: 500,
  },
  img: {
    maxWidth: 500,
  },
});

export default function Upload({ currentId, setCurrentId }) {
  const { acceptedFiles } = useDropzone();

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: "",
    filePath: "",
    creator:  ""
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  //User and submit info
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // const classes = useStyles();

  //for dropzone and oth
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area// state for storing actual image
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const clear = () => {
    // setCurrentId(0);
    setPostData({ title: "", description: "", tags: "", filePath: "" });
    setFile({});
    setPreviewSrc("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    alert("submit");
    console.log(postData);
    // if (currentId === 0) {
    // const { title, description } = postData;
    // setPostData({
    //   ...postData,
    //   creator:  user?.result?.userID,
    // })
    // console.log(user)
    const data = { ...postData, creator: user.result.userID }
    // data.creator = user.result.userID;
    // data
    console.log(data,"<<<<")
    if (file) {
      const formData = new FormData();
      formData.append("file", file, data);
      // formData.append("data", data);
      // formData.append('imageUpload',this.new_attachments)
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("creator", user.result.userID);
      formData.append("tags", postData.tags);
      
      console.log(formData.get("file"));
      // console.log(data)
      // setErrorMsg('');
      // await axios.post(`${API_URL}/upload`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      // const data = {formData}
      // console.log(data)
      await dispatch(createPost(formData));
      clear();
    }

    // } else {
    //   // dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    //   // clear();
    // }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    console.log(uploadedFile);
    // let formData = new FormData()

    // const fileObjects = acceptedFiles.map(file => {
    //   console.log(file)
    //   formData.append('assets', file, file.name)
    // })
    // console.log(formData)
    // console.log(formData.getAll('assets'))

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
      // console.log(fileReader.result)
      // setPostData({ ...postData, filePath: fileReader })}
    };
    fileReader.readAsDataURL(uploadedFile);
    // console.log(fileReader.readAsDataURL(uploadedFile))
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    // dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      // dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      // dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  //   const handleChange = (e) => {
  //     setPostData({ ...postData, message: e.target.value })
  //     // setPostData({ ...postData, filePath: fileReader.result })}
  //     console.log(user);
  // };

  if (!user?.result?.username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to post
        </Typography>
      </Paper>
    );
  }
  // maxWidth="sm"
  // { title, description, creator, filePath, tags } form guide
  return (
    // <React.Fragment>

    <Box pt={2}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleOnSubmit}
      >
        <Container maxWidth="sm">
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Published as @{user?.result.username}
              </Typography>
              <Grid container alignItems="flex-start" spacing={3} mt={2}>
                <Grid item sm={12}>
                  <Paper
                    elevation={3}
                    className="dropper"
                    p={2}
                    style={{ height: 200 }}
                  >
                    <Dropzone
                      onDrop={onDrop}
                      onDone={({ base64 }) =>
                        setPostData({ ...postData, selectedFile: base64 })
                      }
                      onChange={(e) =>
                        setPostData({ ...postData, filePath: e.target.value })
                      }
                      onDragEnter={() => updateBorder("over")}
                      onDragLeave={() => updateBorder("leave")}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} name="filePath" />

                            <Grid container justify="center">
                              <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                  // left: '50%',
                                  // top: '60%',
                                  transform: "translate(1%, 100%)",
                                }}
                              >
                                Drag 'n' drop some files here, or click to
                                select files
                              </Typography>
                            </Grid>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  {previewSrc ? (
                    isPreviewAvailable ? (
                      <div className="image-preview">
                        {(e) =>
                          setPostData({ ...postData, filePath: previewSrc })
                        }
                        {/* {console.log(previewSrc)} */}
                        <img
                          style={{ width: "100%" }}
                          className="preview-image"
                          src={previewSrc}
                          alt="Preview"
                        />
                      </div>
                    ) : (
                      <div className="preview-message">
                        <p>No preview available for this file</p>
                      </div>
                    )
                  ) : (
                    <div className="preview-message">
                      <p>Image preview will be shown here after selection</p>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Title"
                    variant="outlined"
                    name="title"
                    onChange={(e) =>
                      setPostData({ ...postData, title: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Description"
                    variant="outlined"
                    name="description"
                    onChange={(e) =>
                      setPostData({ ...postData, description: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Tags"
                    variant="outlined"
                    name="tags"
                    multiline
                    rows={3}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        tags: e.target.value.split(","),
                      })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={clear}
                style={{ margin: 5 }}
                variant="contained"
                color="secondary"
              >
                Clear
              </Button>
            </CardActions>
          </Card>
        </Container>
      </form>
    </Box>
    // </React.Fragment>
  );
}

// export default Upload;
