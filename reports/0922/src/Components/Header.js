import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <header>
    <ul>
      <li>
        <Link to="/"> Prices </Link>
      </li>
    </ul>
    <ul>
      <li>
        <Link to="/exchanges"> Exchanges </Link>
      </li>
    </ul>
    <ul>
      <li>
        <Link to="/coins"> Coins </Link>
      </li>
    </ul>
  </header>
);