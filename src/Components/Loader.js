import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  font-size: 25px;
  margin-top: 20px;
  letter-spacing: 3px;
`;

export default () => (
  <Container>
    <span>Loading...</span>
  </Container>
);
