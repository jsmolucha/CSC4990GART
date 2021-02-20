import React, { Component } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//Pages
import Welcome  from "./pages"; 
import mainpage from "./pages/mainpage";
import error from "./pages/404";


class App extends Component {
  render() {
    return (
      <Router>
       {/*All our Routes goes here!*/}
       <Route exact path="/" component={Welcome} />
      </Router>
    );
  }
  render() {
    return (
      <Router>
       <Route exact path="/" component={Welcome} />
       <Route exact path="/main" component={mainpage} />
      </Router>
    );
  }
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/main" component={mainpage} />
        <Route exact path="/404" component={error} />
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}
export default App;



