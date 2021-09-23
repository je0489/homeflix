import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const COLOR = {
  TEXT: {
    none: "black",
    selected: "white"
  },
  BG: {
    none: "white",
    selected: "rgb(237, 198, 55)"
  }
};

const Hedaer = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 35px 0;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  height: 100%;
  margin-right: 20px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) =>
    props.isCurrent ? COLOR.TEXT.selected : COLOR.TEXT.none};
  background-color: ${(props) =>
    props.isCurrent ? COLOR.BG.selected : COLOR.BG.none};
`;
const SLink = styled(Link)`
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Hedaer>
    <List>
      <Item isCurrent={pathname === "/"}>
        <SLink to="/">Prices</SLink>
      </Item>
      <Item isCurrent={pathname === "/exchanges"}>
        <SLink to="/exchanges">Exchanges</SLink>
      </Item>
      <Item isCurrent={pathname === "/coins"}>
        <SLink to="/coins">Coins</SLink>
      </Item>
    </List>
  </Hedaer>
));
