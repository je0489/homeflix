import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  height: 12rem;
`;

const ellipsis1 = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const ellipsis2 = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(24px, 0);
  }
`;

const ellipsis3 = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;

  &::before {
    content: "LOADING";
    position: absolute;
    left: -1.9rem;
    bottom: -1.2rem;
    font-size: 1.56rem;
    letter-spacing: 3px;
  }

  div {
    position: absolute;
    top: 1.833rem;
    width: 0.722rem;
    height: 0.722rem;
    border-radius: 50%;
    background: #df5458;
    font-family: impact;
    font-size: 1.8rem;

    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 0.5rem;
      animation: ${ellipsis1} 0.6s infinite;
    }

    &:nth-child(2) {
      left: 0.5rem;
      animation: ${ellipsis2} 0.6s infinite;
    }

    &:nth-child(3) {
      left: 1.777rem;
      animation: ${ellipsis2} 0.6s infinite;
    }

    &:nth-child(4) {
      left: 3.111rem;
      animation: ${ellipsis3} 0.6s infinite;
    }
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Container>
    <Box>
      <Loading>
        {Array(4)
          .fill()
          .map((_, idx) => (
            <div key={idx} />
          ))}
      </Loading>
    </Box>
  </Container>
);
