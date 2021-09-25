import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Container = styled.div`
  display: grid;
  width: 100%;
`;

const Section = styled.div`
  padding-bottom: 30px;
`;

const Div = styled.div`
  padding-bottom: 10px;
`;

const ExchangesPresenter = ({ exchanges, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {exchanges.map((exchange) => {
        const { name, description, links } = exchange;
        return (
          <Section>
            <Div>{name}</Div>
            <Div>{description?.slice(0, 50)}...</Div>
            <Div>{links?.website[0]}</Div>
          </Section>
        );
      })}
    </Container>
  );

ExchangesPresenter.propTypes = {
  exchanges: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default ExchangesPresenter;
