import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//Pages
import Welcome from "./pages"; 
import mainpage from "./pages/mainpage";
import loginpage from "./pages/login"
import error from "./pages/404";


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/main" component={mainpage} />
        <Route exact path="/404" component={error} />
        <Route exact path="/login" component={loginpage} />
        <Redirect to="/404" /> 
        </Switch>
      </Router>
    )
  }
}
export default App;



