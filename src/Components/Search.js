import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form`
  display: flex;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const SearchContainer = styled.div`
  width: 0;
  padding: 0.5rem 0;
  margin-right: 0.3rem;
  transition: all 0.5s linear;

  &:focus-within {
    border-bottom: 1px solid white;
  }
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  text-align: left;
  font-size: smaller;
`;

const Search = () => {
  const [clickSearchBtn, setClickSearchBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef();
  const history = useHistory();

  const handleSearchWindow = () => {
    const { style, firstChild } = searchRef.current;
    if (clickSearchBtn) {
      style.width = "15rem";
      firstChild.focus();
      style.paddingLeft = style.paddingRight = "1rem";
    } else {
      setSearchTerm("");
      style.width = style.paddingLeft = style.paddingRight = "";
    }

    firstChild.value = searchTerm;
    setClickSearchBtn(!clickSearchBtn);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push("/search", searchTerm);
  };

  const updateTerm = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SearchContainer ref={searchRef}>
        <Input
          type="text"
          placeholder="사람, 제목, 장르를 입력하세요"
          value={searchTerm}
          onChange={updateTerm}
        />
      </SearchContainer>
      <IconContainer onClick={handleSearchWindow}>
        <FontAwesomeIcon icon={faSearch} className="search" />
      </IconContainer>
    </Form>
  );
};

export default Search;
