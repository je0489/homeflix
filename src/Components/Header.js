import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const logo_src = "logo__longer.png",
  normal = 100,
  bolder = 600;

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.75rem;
  padding: 0 1.1rem;
  font-size: 0.9rem;
  color: white;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const Main = styled.div`
  padding: 0 1rem;

  & img {
    width: 8rem;
  }
`;

const List = styled.ul`
  display: inherit;
  width: 100%;
`;

const Item = styled.li`
  padding: 0 20px;
  height: 3.75rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: ${(props) => (props.isCurrent ? `${bolder}` : `${normal}`)};
  transition: 0.4s ease-out;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &:last-child {
    margin-left: auto;
    font-size: 1.2rem;
  }

  &:hover:not(:last-child) {
    opacity: ${(props) => (props.isCurrent ? "inherit" : 0.6)};
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <Main>
      <Link to="/">
        <img src={logo_src} alt="logo" />
      </Link>
    </Main>
    <List>
      <Item isCurrent={pathname === "/"}>
        <Link to="/"> 홈</Link>
      </Item>
      <Item isCurrent={pathname === "/tv"}>
        <Link to="/tv">TV 프로그램</Link>
      </Item>
      <Item isCurrent={pathname === "/movie"}>
        <Link to="/movie">영화</Link>
      </Item>
      <Item isCurrent={pathname === "/trending"}>
        <Link to="/trending">NEW! 요즘 대세 콘텐츠</Link>
      </Item>
      <Item isCurrent={pathname === "/search"}>
        <Search />
      </Item>
    </List>
  </Header>
));
