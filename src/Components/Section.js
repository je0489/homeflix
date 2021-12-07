import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 3.125rem;
  }
  width: calc(100vw - 1.5rem);
`;

const Title = styled.span`
  font-size: 1.12rem;
  font-weight: 600;
`;

const PosterContainer = styled.div`
  display: flex;
  margin-top: 1.35rem;
`;

const Button = styled.div`
  position: absolute;
  font-size: 3rem;
  font-weight: 900;
  align-self: center;
  cursor: pointer;
  z-index: 5;

  &:hover::before {
    margin: 0 -0.4rem;
    opacity: 0.6;
    font-size: 4rem;
  }

  &.left {
    left: 0.5rem;
    &::before {
      content: "<";
    }
  }

  &.right {
    right: 0.5rem;
    ::before {
      content: ">";
    }
  }

  &.hidden {
    display: none;
  }
`;

const Poster = styled.div`
  display: inherit;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const Section = ({ title, children }) => {
  const posterRef = useRef();
  const position = { left: "left", right: "right", none: "" },
    [currentPosition, setCurrentPosition] = useState(position.left);

  const getPosition = (width) => {
    const { scrollWidth, clientWidth } = posterRef.current;
    setCurrentPosition(
      width > 0
        ? scrollWidth - (width + clientWidth) > 0
          ? position.none
          : position.right
        : position.left
    );
  };

  const moveToLeft = () => {
    const { current } = posterRef;
    getPosition((current.scrollLeft -= current.clientWidth));
  };
  const moveToRight = () => {
    const { current } = posterRef;
    getPosition((current.scrollLeft += current.clientWidth));
  };

  return (
    <Container>
      <Title>{title}</Title>
      <PosterContainer>
        <Button
          className={`left ${
            currentPosition === position.left ? "hidden" : ""
          }`}
          onClick={moveToLeft}
        />
        <Poster ref={posterRef}>{children}</Poster>
        <Button
          className={`right ${
            currentPosition === position.right ? "hidden" : ""
          }`}
          onClick={moveToRight}
        />
      </PosterContainer>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
