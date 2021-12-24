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

export default function Routers() {
  return (
    <Router basename="/netflix-clone">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path={["/tv", "/tv/:id"]} component={TV} />
        <Route exact path={["/movie", "/movie/:id"]} component={Movie} />
        <Route exact path={["/search", "/search/:id"]} component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
