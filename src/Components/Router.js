import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Home from "Routes/Home/index";
import Movie from "Routes/Movie/index";
import TV from "Routes/TV/index";
import Search from "Routes/Search/index";
import Tranding from "Routes/Tranding/index";
import Detail from "Routes/Detail";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/movie" exact component={Movie} />
      <Route path="/search" exact component={Search} />
      <Route path="/trending" exact component={Tranding} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/show/:id" component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
