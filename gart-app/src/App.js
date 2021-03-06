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
import PermaContest from "./pages/contest/contestEntry/permaContest"
import Submission from "./pages/contest/contestEntry/submissions"
import WithModel from "./pages/babylon/demo"
import SearchByUsername from './pages/search/searchUsers'
import LikedPost from './pages/post/likedPost'
import AccountDelete from "./pages/profileupdate/proDelete"
import Profileupdate from "./pages/profileupdate/proUpdate"
import Passwordupdate from "./pages/profileupdate/passUpdate"

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
        <PrivateRoute exact path="/account" component={MyComponent} />
        <PrivateRoute exact path="/@:username" component={Profile} />
        <Route exact path="/post/:postId" component={Permalink} />
        <Route exact path="/edit/:postId" component={Edit} />
        <Route exact path="/nav" component={NavBar} />
        <Route exact path="/delete" component={Delete} />
        <Route exact path="/likes" component={LikedPost} />
        <PrivateRoute exact path="/@:username/profileUpdate" component={Profileupdate} />
        <PrivateRoute exact path="/@:username/passwordUpdate" component={Passwordupdate} />
        <PrivateRoute exact path="/@:username/accountDelete" component={AccountDelete} />
        
        {/* <Route exact path="/contests" component={Contest} /> */}
        <Route exact path="/search/:query" component={Search} />
        <Route exact path="/searchUsers/:query" component={SearchByUsername} />

        <Route exact path="/demo" component={WithModel} />
        <Route exact path="/contests" component={Contest} /> 
        <Route exact path="/newcontest" component={ContestPage} />
        <Route exact path="/constest-detail/:contestId" component={PermaContest} />
        <Route exact path="/constest-submissions/:contestId" component={Submission} />

        {/* <Route exact path="/contest/:contestId" component={} /> */}
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}

export default App;



