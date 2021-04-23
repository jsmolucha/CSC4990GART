import React, { useEffect, useState } from "react";
import AddCommentIcon from '@material-ui/icons/AddComment';
import { useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {addComment} from "../../../actions/post"



const CommentButton = ({ PID, userID, username }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false)
    const [load, setLoad] = useState(false)
    const [comment, setComment] = useState({
        onPost: PID,
        commentBy: userID,
        username: username,
        comment: ""
    });

    const handleChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
        //console.log(comment);
    };

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClickClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { ...comment }
        alert('Submitted')
        console.log(data.comment)
        dispatch(addComment(data))
    }


const Comment = () =>{
        return <AddCommentIcon  fontSize="large" />
    }

 
    useEffect(() => {
        setLoad(true)
    }, []);

    
    
     

    return (
        <div>
        <IconButton size="small" color="secondary" onClick={handleClickOpen}>
        {(load) && (<Comment />)} 
        </IconButton>
        <Dialog open={open} onClose ={handleClickClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id="comment">Comment</DialogTitle>
            <DialogContent>
                <form id="commentForm" onChange={handleChange} onSubmit ={handleSubmit}>
                <TextField
                autoFocus
                margin="dense"
                id="comment"
                name="comment"
                label="comment"
                type="text"
                fullWidth
                />
                </form>
           
            </DialogContent>
            <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickClose} color="primary" type='submit' form="commentForm">
            Comment
          </Button>
        </DialogActions>
        </Dialog>
        </div>
    )
}

export default CommentButton