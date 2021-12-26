import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "../Pages/Home";
import TV from "../Pages/TV";
import Movie from "../Pages/Movie";
import Search from "../Pages/Search";

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
