import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { moviesApi } from "../api";
import { noImage, top10 } from "../utils";

import Loader from "../Components/Loader";
import Billboard from "../Components/Billboard";
import Section from "../Components/Section";
import Detail from "../Components/Detail";
import ErrorMsg from "../Components/ErrorMsg";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
`;

const CardContainer = styled.div`
  padding: 0 1.2rem;
`;

function Movie() {
  const offset = 5;
  const [billboard, setBillboard] = useState({});
  const [random, setRandom] = useState();

  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setRandom(Math.floor(Math.random() * offset));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { genres },
        } = await moviesApi.getGenres();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const { data: results } = await moviesApi.movieDetail(
          +popular[random].id
        );

        const createGenreKey = (datas) =>
          datas.map((data) => {
            const { genre_ids } = data;
            return {
              ...data,
              genres: genre_ids.map(
                (_id) => genres.find(({ id, _ }) => id === _id).name
              ),
            };
          });

        setBillboard(results);
        setPopular(createGenreKey(top10(noImage(popular))));
        setNowPlaying(createGenreKey(noImage(nowPlaying)));
        setUpcoming(createGenreKey(noImage(upcoming)));
        setLoading(results && popular && nowPlaying && upcoming ? false : true);
        setError("");
      } catch (e) {
        console.log(e);
        setError("오류가 발생했습니다! 영화 정보를 찾을 수 없습니다.");
      }
    })();
  }, [random]);

  return (
    <>
      <Helmet>
        <title>Movie - Homeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          {billboard && (
            <Billboard
              bgUrl={billboard.backdrop_path}
              logos={billboard.images.logos}
              title={billboard.original_title}
            />
          )}
          <CardContainer>
            {popular && popular.length > 0 && (
              <Section
                title="오늘 TOP 10 영화"
                keyword="popular"
                cards={popular}
                isPopular
              />
            )}
            {nowPlaying && nowPlaying.length > 0 && (
              <Section
                title="지금 상영 중인 영화"
                keyword="nowPlaying"
                cards={nowPlaying}
              />
            )}
            {upcoming && upcoming.length > 0 && (
              <Section
                title="최근에 개봉한 영화"
                keyword="upcoming"
                cards={upcoming}
              />
            )}
            <Detail />
            {error && <ErrorMsg type="error" text={error} />}
          </CardContainer>
        </Wrapper>
      )}
    </>
  );
}

export default Movie;
