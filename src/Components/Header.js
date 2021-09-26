import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 20px;
  width: 100%;
  height: 60px;
  font-size: 1.1rem;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  /* width: 80px; */
  height: 60px;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 5px solid
    ${(props) => (props.isCurrent ? "#E50914" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  padding: 0 20px;
`;

const SLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item isCurrent={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item isCurrent={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item isCurrent={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
