import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {PrivateRoute} from "./actions/auth"
//Pages
import ReactDOM from "react-dom"
import Welcome from "./pages"; 
import mainpage from "./pages/mainpage";
import Registerpage from "./pages/register"
import login from "./pages/login";
import error from "./pages/404";
import upload from "./pages/upload"
import MyComponent from "./pages/account"
import Profile from './pages/post/profile'
import Permalink from './pages/post/permaPost'
import Edit from "./pages/edit/edit"
import NavBar from './pages/Nav/navbar'
import Delete from './pages/delete'
import Search from './pages/search/searchPage'
import Contest from './pages/contest/contests'
import ContestPage from "./pages/newcontest"

import LikedPost from './pages/post/likedPost'
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={login} />
        <Route exact path="/main" component={mainpage} />
        <Route exact path="/404" component={error} />
        <Route exact path="/register" component={Registerpage} />
        <Route exact path="/upload" component={upload} />
        <Route exact path="/account" component={MyComponent} />
        <Route exact path="/@:username" component={Profile} />
        <Route exact path="/post/:postId" component={Permalink} />
        <Route exact path="/edit/:postId" component={Edit} />
        <Route exact path="/nav" component={NavBar} />
        <Route exact path="/delete" component={Delete} />
        <Route exact path="/likes" component={LikedPost} />
        <Route exact path="/search/:query" component={Search} />

        
        <Route exact path="/contests" component={Contest} />
        <Route exact path="/newcontest" component={ContestPage} />
        {/* <Route exact path="/contest/:contestId" component={} /> */}
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}

export default App;



