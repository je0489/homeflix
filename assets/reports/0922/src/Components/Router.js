import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Prices from "../Screens/Prices";
import Exchanges from "../Screens/Exchanges";
import Coins from "../Screens/Coins";

export default () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Prices} />
      <Route path="/exchanges" exact component={Exchanges} />
      <Route path="/coins" exact component={Coins} />
    </Router>
  );
};