import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const NOT_FOUND = "404";
const ERROR = "error";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: ${(props) => (props.type === NOT_FOUND ? "#95a5a6" : "#e74c3c")};
`;

const ErrorMsg = ({ type, text }) => (
  <Container>
    <Text type={type}>{text}</Text>
  </Container>
);

ErrorMsg.propTypes = {
  type: PropTypes.oneOf([NOT_FOUND, ERROR]).isRequired,
  text: PropTypes.string.isRequired,
};

export default ErrorMsg;
