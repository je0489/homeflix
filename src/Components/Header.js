import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const logo_src = "logo__longer.png";
const normal = 100,
  bolder = 600;

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.75rem;
  padding-left: 20px;
  font-size: 0.9rem;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const Main = styled.div`
  padding: 0 1rem;
  color: #e42414;
  font-family: impact;
  font-size: 1.8rem;

  & img {
    width: 8rem;
  }
`;

const List = styled.ul`
  display: inherit;
`;

const Item = styled.li`
  height: 3.75rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: ${(props) => (props.isCurrent ? `${bolder}` : `${normal}`)};
  padding: 0 20px;

  &:hover {
    opacity: ${(props) => (props.isCurrent ? "inherit" : 0.6)};
    transition: 0.4s ease-out;
  }
`;

const SLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <Main>
      <SLink to="/">
        <img src={logo_src} alt="logo" />
      </SLink>
    </Main>
    <List>
      <Item isCurrent={pathname === "/"}>
        <SLink to="/"> 홈</SLink>
      </Item>
      <Item isCurrent={pathname === "/tv"}>
        <SLink to="/tv">TV 프로그램</SLink>
      </Item>
      <Item isCurrent={pathname === "/movie"}>
        <SLink to="/movie">영화</SLink>
      </Item>
      <Item isCurrent={pathname === "/trending"}>
        <SLink to="/trending">NEW! 요즘 대세 콘텐츠</SLink>
      </Item>
      <Item isCurrent={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
