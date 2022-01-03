import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const logo_src = "logo_default.png",
  logo_src__mobile = "logo_mobile.png";

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
  z-index: 5;

  @media ${({ theme }) => theme.mobile} {
    padding: 0 1.2rem;

    li {
      padding: 0 0.7rem;
    }
  }
`;

const Logo = styled.div`
  div {
    width: 8rem;
    height: 3rem;
    background-image: url(${logo_src});
    background-position: center center;
    background-size: cover;

    @media ${({ theme }) => theme.mobile} {
      background-image: url(${logo_src__mobile});
      width: 3rem;
      height: 2.4rem;
    }
  }
`;

const List = styled.ul`
  display: inherit;
  position: relative;
  width: 100%;
  margin-left: 1rem;
  white-space: pre;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Item = styled.li`
  padding: 0 1.25rem;
  height: 3.75rem;
  text-align: center;
  font-weight: ${(props) => (props.isCurrent ? 600 : 100)};
  transition: 0.4s ease-out;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &:hover {
    opacity: ${(props) => (props.isCurrent ? "inherit" : 0.6)};
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <Logo>
      <Link to="/">
        <div />
      </Link>
    </Logo>
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
    </List>
    <Search />
  </Header>
));
