import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Movie from "../Routes/Movie";
import Search from "../Routes/Search";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path={["/tv", "/tv/:id"]} exact component={TV} />
      <Route path={["/movie", "/movie/:id"]} exact component={Movie} />
      <Route path={["/search", "/search/:id"]} exact component={Search} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
