// import React from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStyles from '../styles/main'
import logo from "../images/placeholder.svg"
import search from "../images/search.svg"
import { Link, useHistory, useLocation } from 'react-router-dom';
// import {dispatch} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import * as actionType from '../../constants/actionTypes';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';


const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        minHeight: "10vh",
        backgroundColor: "#0C0E12",
    },
    toolbar: {
        // minHeight: 200,
        height: "60px",
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        // display: "flex",
        // justifyContent: "space-between",
    },

    searchBar: {
        flexGrow: 1,
        position: 'relative',
        // alignItems: 'center',
        // marginLeft: "auto",
        // marginRight: "auto",
        // marginTop: "10px",
        borderRadius: "10px",
        border: "none",
        // width: "80%",
        height: "40px",
        backgroundColor: "#242c37",
        fontSize: "20px",
        color: "#B2BDCD",
        transition: ".3s ease-out",
        outline: "none",
        textIndent: "14px",

        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(2),
        //     width: 'auto',
        // },
        // marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        // marginRight: theme.spacing(2),
        /* width: 100%; */
    },
    logo: {
        minWidth: "30px",
        marginRight: theme.spacing(1),
        flexGrow: 1,
    },
    logoText: {
        flexGrow: 1,
        // color: "#FFF",
        color: "#e48100",
        fontSize: 40,
        // margin: "auto 0 auto 0",
        marginRight: theme.spacing(2),
        // [theme.breakpoints.up('sm')]: {
        //     visibility: "none",
        // },
    },
    logOut: {
        display: "block",
        background: "none",
        outline: "none",
        border: "none",
        color: "white",
        fontSize: 25,
        fontWeight: 600,
        fontFamily: 'Inter',
        // margin: "20px auto 0 auto",
        transition: ".3s ease-out",
        padding: 5,
        borderRadius: 10,
    },
    accountBtn: {

        display: "block",
        background: "none",
        outline: "none",
        border: "none",
        color: "#009874",
        fontSize: 25,
        fontWeight: 600,
        fontFamily: 'Inter',
        // margin: "20px auto 0 auto",
        transition: ".3s ease-out",
        padding: 5,
        borderRadius: 10,
    },
    signIn: {
        display: "block",
        background: "none",
        outline: "none",
        border: "none",
        color: "white",
        fontSize: 25,
        fontWeight: 600,
        fontFamily: 'Inter',
        // margin: "20px auto 0 auto",
        transition: ".3s ease-out",
        padding: 5,
        borderRadius: 10,
    },

}));

const { API_URL } = require('../../constants/constants')

const API = axios.create({ baseURL: `${API_URL}` });

export default function NavBar({ props }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/');

        setUser(null);
    };


    const classes = useStyle();

    return (
        <>
            {/* {console.log(user)} */}
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img className={classes.logo} src={logo} alt="" />
                    </IconButton>
                    <Hidden xsDown>
                        <h3 className={classes.logoText}>GART</h3>
                    </Hidden>
                    <input className={classes.searchBar} type="text" placeholder="Search" />


                    {user?.result ? (
                        <>
                            <Hidden xsDown>
                                <button className={classes.accountBtn} >Account</button>
                                <button className={classes.logOut} onClick={logout}>Logout</button>
                            </Hidden>
                            <Hidden smUp>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    >
                                    <PersonIcon></PersonIcon>
                                </IconButton>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                    onClick={logout}
                                >
                                    <ExitToAppIcon></ExitToAppIcon>
                                </IconButton>
                            </Hidden>
                        </>
                    ) : (
                        <button className={classes.logOut}>
                             <Link to="/login" id='loginlink'> Sign In</Link>
                        </button>
                        // <div className='noLogin'>
                        //     <button id='loginButton'>
                        //         <Link to="/login" id='loginlink'> Sign In</Link>
                        //     </button>
                        //     <Link id='statusText' to='/register'>Create an account</Link>
                        // </div>
                    )}





                </Toolbar>
            </AppBar>

        </>

    )


}


// export default NavBar;