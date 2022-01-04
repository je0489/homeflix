import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { tvApi, moviesApi, trandingApi } from "../api";
import { noImage, top10 } from "../utils";

import Loader from "../Components/Loader";
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

export default function Trending() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);

  const isMovie = (trendy) => trendy.media_type === "movie";

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { genres: tvGenres },
        } = await tvApi.getGenres();
        const {
          data: { genres: movieGenres },
        } = await moviesApi.getGenres();
        const {
          data: { results: allResults },
        } = await trandingApi.trendyAll();
        const {
          data: { results: tvResults },
        } = await trandingApi.trendyTvShows();
        const {
          data: { results: movieResults },
        } = await trandingApi.trendyMovies();

        const createGenreKey = (datas) =>
          datas.map((data) => {
            const { genre_ids } = data;
            return {
              ...data,
              genres: genre_ids
                .map((_id) => {
                  const genre = !isMovie(data)
                    ? tvGenres.find(({ id, _ }) => id === _id)
                    : movieGenres.find(({ id, _ }) => id === _id);
                  return genre ? genre.name : "";
                })
                .filter((name) => name !== ""),
            };
          });

        setAllResults(createGenreKey(top10(noImage(allResults))));
        setTvResults(createGenreKey(noImage(tvResults)));
        setMovieResults(createGenreKey(noImage(movieResults)));
        setLoading(allResults && tvResults && movieResults ? false : true);
        setError("");
      } catch (e) {
        setError("오류가 발생했습니다! 대세 콘텐츠 정보를 찾을 수 없습니다.");
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Trending - Homeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          <CardContainer>
            {allResults && allResults.length > 0 && (
              <Section
                title="이번 주 TOP 10 핫한 콘텐츠"
                keyword="trendyAll"
                cards={allResults}
                isPopular
              />
            )}
            {tvResults && tvResults.length > 0 && (
              <Section
                isMovie={false}
                title="이번 주 핫한 TV 프로그램"
                keyword="trendyTvShows"
                cards={tvResults}
              />
            )}
            {movieResults && movieResults.length > 0 && (
              <Section
                isMovie={true}
                title="이번 주 핫한 영화"
                keyword="trendyMovies"
                cards={movieResults}
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
