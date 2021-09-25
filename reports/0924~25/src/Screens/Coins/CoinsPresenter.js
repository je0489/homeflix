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

const CoinsPresenter = ({ coins, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {coins.map((coin) => {
        const { rank, name, symbol } = coin;
        return (
          <Div>
            #{rank} {name}/{symbol}
          </Div>
        );
      })}
    </Container>
  );

CoinsPresenter.propTypes = {
  coins: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default CoinsPresenter;
