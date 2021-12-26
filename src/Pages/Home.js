import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import styled, { keyframes } from "styled-components";
import { moviesApi } from "../api";
import { noImage, top10, makeImageFullUrl } from "../utils";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  margin-bottom: 0.5rem;

  h4 {
    color: #ddd;
    font-weight: 200;
  }
`;

const movingPosters = (width) => keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(calc(100vw - ${width}px));
  }
`;

const Populars = styled.div`
  display: flex;
  padding: 2rem;
  height: fit-content;
  margin-bottom: 1rem;
  animation: ${({ totalWidth }) => movingPosters(totalWidth)} 10s linear 1s
    forwards alternate infinite;
  place-self: flex-start;
`;

const Popular = styled.div`
  background-image: url(${({ posterUrl }) => posterUrl});
  background-size: cover;
  background-position: center center;
  width: 15rem;
  height: 22rem;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const MovieLink = styled(Link)`
  background-color: #e42414;
  border-radius: 3px;
  padding: 0.7rem 5rem;
  font-weight: 100;
  cursor: pointer;
  color: white;

  &:hover {
    opacity: 0.7;
  }
`;

function Home() {
  const postersRef = useRef();
  const [popularMovie, setPopularMovie] = useState([]);
  const [totalWidth, setTotalWidth] = useState(10);

  const getTotalPostersWidth = () => {
    const { offsetWidth } = postersRef.current;
    setTotalWidth(offsetWidth);
  };

  useEffect(() => {
    (async () => {
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setPopularMovie(top10(noImage(popular)));
      getTotalPostersWidth();
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Homeflix</title>
      </Helmet>
      <Container>
        <Content>
          <h1>보고 싶은 콘텐츠를 지금 만나보세요!</h1>
        </Content>
        <Content>
          <h4>Homeflix에서 최신 인기 TV 프로그램, 영화, 해외 시리즈까지!</h4>
        </Content>
        {popularMovie && (
          <Populars ref={postersRef} totalWidth={totalWidth}>
            {popularMovie.map(({ poster_path }, idx) => (
              <Popular
                key={idx}
                posterUrl={makeImageFullUrl(poster_path, "w500")}
              ></Popular>
            ))}
          </Populars>
        )}
        <MovieLink to="/movie">자세히 보기</MovieLink>
      </Container>
    </>
  );
}

export default Home;
