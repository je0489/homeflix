import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { moviesApi } from "../api";
import { noImage, top10 } from "../utils";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import ErrorMsg from "../Components/ErrorMsg";

const Container = styled.div`
  padding: 1.2rem;
`;

function Movie() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        setPopular(top10(noImage(popular)));
        setNowPlaying(noImage(nowPlaying));
        setUpcoming(noImage(upcoming));
        setLoading(popular && nowPlaying && upcoming ? false : true);
      } catch {
        setError("오류가 발생했습니다! 영화 정보를 찾을 수 없습니다.");
      }
    })();
  }, []);
  return (
    <>
      <Helmet>
        <title>Movie - Homeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {popular && popular.length > 0 && (
            <Section title="오늘 TOP 10 영화" cards={popular} />
          )}
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="지금 상영 중인 영화" cards={nowPlaying} />
          )}
          {upcoming && upcoming.length > 0 && (
            <Section title="곧 개봉할 영화" cards={upcoming} />
          )}
          {error && <ErrorMsg type="error" text={error} />}
        </Container>
      )}
    </>
  );
}

export default Movie;
