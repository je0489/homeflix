import React from "react";
import PropTypes, { symbol } from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Container = styled.div``;

const Div = styled.div``;

const Ranking = styled.span`
  font-weight: 700;
`;

const CoinsPresenter = ({ coins, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {coins
        .filter((coin) => coin.rank !== 0)
        .sort((f, s) => f.rank - s.rank)
        .map((coin) => {
          const { id, rank, name, symbol } = coin;
          return (
            <Div key={id}>
              <Ranking>#{rank} </Ranking>
              {name}/{symbol}
            </Div>
          );
        })}
    </Container>
  );

CoinsPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired
  ).is,
  error: PropTypes.string,
};

export default CoinsPresenter;
