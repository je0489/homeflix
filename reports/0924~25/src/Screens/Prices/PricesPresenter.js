import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Container = styled.div`
  display: grid;
  width: 100%;
`;

const Div = styled.div`
  padding-bottom: 8px;
`;

const PricesPresenter = ({ homepage, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {homepage.map((h) => {
        const {
          name,
          symbol,
          quotes: {
            USD: { price }
          }
        } = h;
        return (
          <Div>
            {name} / {symbol} : ${price}
          </Div>
        );
      })}
    </Container>
  );

PricesPresenter.propTypes = {
  homepage: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default PricesPresenter;
