import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalImage from "react-modal-image";
import { deletePost, updatePost } from "../../../actions/post";
import useStyles from "./styles";
import {
  Box,
  Container,
  Grid,
  TextField,
  Paper,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";

export default function EditPost({ currentId, setCurrentId, image }) {
  const [postData, setPostData] = useState({
    ...image
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  //User and submit info
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

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
    setPostData({ ...image });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // alert("submit");

    const data = { ...postData, creator: user.result.userID, username: user.result.username };

    dispatch(updatePost(image._id, { ...data }, history));

  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);


    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      // dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      // dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  if (!user?.result?.username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to post
        </Typography>
      </Paper>
    );
  }

  return (
    <Box pt={2}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleOnSubmit}
        onChange={handleInputChange}
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

                <Grid item xs={12}>

                  <ModalImage
                    className={classes.modalImage}
                    small={image.filePath}
                    large={image.filePath}
                    alt="Preview"
                  />

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={postData.title}
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
                    value={postData.description}
                    multiline
                    rows={3}
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
                    value={postData.tags}
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
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="secondary"
                // color="primary"
                onClick={() => {
                  dispatch(deletePost(postData._id))
                  history.push('/delete')
                }

                }
              >
                Delete
              </Button>
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="secondary"
                // color="primary"
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Container>
      </form>
    </Box>
  );
}
