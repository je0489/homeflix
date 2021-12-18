import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import { moviesApi } from "../api";

import { DefaultContainer } from "../Components/GlobalStyles";

const Container = styled.div`
  ${DefaultContainer}
  position: relative;
`;

const Background = styled.div`
  ${DefaultContainer}
  position: absolute;
  top: 0;
  left: 0;
  background-position: center;
  background-color: black;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  opacity: 0.5;
  z-index: -2;
`;

const TextContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  position: absolute;
  top: 40%;
  left: 8%;
  font-size: large;
  letter-spacing: 0.05rem;

  p {
    margin-bottom: 0.5rem;
  }

  p:last-of-type {
    margin-bottom: 1.4rem;
  }
`;

const HomeFilx = styled.span`
  font-weight: bolder;
  font-size: xx-large;
  margin-right: 0.3rem;
`;

const MovieLink = styled(Link)`
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 0.3rem 1.5rem 0.4rem;
  font-size: 0.95rem;
  font-weight: 100;
  opacity: 0.8;
  z-index: 5;
  cursor: pointer;
  transition: border 0.1s linear;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    border: 2px solid #fff;
  }
`;

function Home() {
  const bgCount = 5;
  const [bgImgOfPopular, setBgImgOfPopular] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setBgImgOfPopular(
        popular.slice(0, bgCount).map((movie) => movie.backdrop_path)
      );
    })();
  }, []);
  return (
    <>
      <Helmet>
        <title>Home - Homeflix</title>
      </Helmet>
      <Container>
        {bgImgOfPopular && bgImgOfPopular.length > 0 && (
          <Background
            imageUrl={`https://image.tmdb.org/t/p/original${
              bgImgOfPopular[Math.floor(Math.random() * bgImgOfPopular.length)]
            }
              `}
          />
        )}
      </Container>
      <TextContainer>
        <p>
          <HomeFilx>HOMEFILX</HomeFilx>에서
        </p>
        <p>최신 인기 상영작을 만나보세요!</p>
        <MovieLink to="/movie">자세히 보기</MovieLink>
      </TextContainer>
    </>
  );
}

export default Home;
