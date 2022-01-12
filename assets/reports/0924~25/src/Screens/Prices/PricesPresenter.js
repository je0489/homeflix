import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Container = styled.div``;

const Section = styled.div`
  padding-bottom: 8px;
`;

const PricesPresenter = ({ prices, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {prices.map((p) => {
        const {
          id,
          name,
          symbol,
          quotes: {
            USD: { price },
          },
        } = p;
        return (
          <Section key={id}>
            {name} / {symbol} : ${price}
          </Section>
        );
      })}
    </Container>
  );

PricesPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      quotes: PropTypes.shape({
        USD: PropTypes.shape({
          price: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  error: PropTypes.string,
};

export default PricesPresenter;
