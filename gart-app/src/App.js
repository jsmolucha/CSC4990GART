import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
//Pages
import ReactDOM from "react-dom"
import Welcome from "./pages"; 
import mainpage from "./pages/mainpage";
import registerpage from "./pages/register"
import login from "./pages/login";
import error from "./pages/404";



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
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}

export default App;



