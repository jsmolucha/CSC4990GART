import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
//Pages
import Welcome from "./pages"; 
import mainpage from "./pages/mainpage";
import registerpage from "./pages/register"
import login from "./pages/login";
import error from "./pages/404";
import upload from "./pages/upload"
import MyComponent from "./pages/account"
import Post from './pages/post/post'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={login} />
        <Route exact path="/main" component={mainpage} />
        <Route exact path="/404" component={error} />
        <Route exact path="/register" component={registerpage} />
        <Route exact path="/upload" component={upload} />
        <Route exact path="/account" component={MyComponent} />
        <Route exact path="/@:username" component={Post} />
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}
export default App;



