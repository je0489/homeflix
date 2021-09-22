import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "Routes/Home/index";
import TV from "Routes/TV/index";
import Search from "Routes/Search/index";

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tv" exact component={TV} />
            <Route path="/search" exact component={Search} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
);