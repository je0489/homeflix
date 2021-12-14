import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 1;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  /* width: 70%; */
  height: 100%;
  margin: 0 250px;
  border-radius: 20px;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const Cover = styled.div`
  width: 100%;
  height: 80%;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${(props) => props.bgImage});
  background-position: top center;
  background-size: cover;
  border-radius: 20px;
`;

const Data = styled.div`
  background-color: black;
`;

const Title = styled.h3``;

const ItemContainer = styled.div``;
const Item = styled.span``;
const Divider = styled.span``;
const Overview = styled.p``;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`}
      />
      <Content>
        <Cover
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Data>
          <Title />
          <ItemContainer>
            <Item />
            <Divider />
            <Item />
            <Divider />
            <Item />
          </ItemContainer>
          <Overview />
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
