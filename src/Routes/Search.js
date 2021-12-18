import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import { tvApi, moviesApi } from "../api";
import { noImage } from "../utils";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import ErrorMsg from "../Components/ErrorMsg";

const Container = styled.div`
  padding: 1.2rem;
`;

const SearchTerm = styled.div`
  display: inline-flex;
  font-weight: 100;
  .term {
    font-weight: bolder;
  }
`;

function Search() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tvResults, setTvResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { genres: tvGenres },
        } = await tvApi.getGenres();
        const {
          data: { results: tvResults },
        } = await tvApi.search(location.state);
        const {
          data: { genres: movieGenres },
        } = await moviesApi.getGenres();
        const {
          data: { results: movieResults },
        } = await moviesApi.search(location.state);

        const createGenreKey = (datas, isMovie) =>
          datas.map((data) => {
            const { genre_ids } = data;
            return {
              ...data,
              genres: genre_ids
                .map((_id) => {
                  const genre = !isMovie
                    ? tvGenres.find(({ id, _ }) => id === _id)
                    : movieGenres.find(({ id, _ }) => id === _id);
                  return genre ? genre.name : "";
                })
                .filter((name) => name !== ""),
            };
          });

        setTvResults(createGenreKey(noImage(movieResults), false));
        setMovieResults(createGenreKey(noImage(tvResults), true));
        setLoading(movieResults && tvResults ? false : true);
      } catch {
        setError(
          "오류가 발생했습니다! 입력한 검색어에 대한 결과를 찾을 수 없습니다."
        );
      }
    })();
  }, [location]);

  return (
    <>
      <Helmet>Homeflix</Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <SearchTerm>
            검색어 "<p className="term">{location.state}</p>"에 대한 검색
            결과입니다.
          </SearchTerm>
          {loading ? (
            <Loader />
          ) : (
            <>
              {tvResults && tvResults.length > 0 && (
                <Section
                  isMovie={false}
                  title="TV Resultes"
                  cards={tvResults}
                />
              )}
              {movieResults && movieResults.length > 0 && (
                <Section
                  isMovie={true}
                  title="Movie Resultes"
                  cards={movieResults}
                />
              )}
              {error && <ErrorMsg type="error" text={error} />}
              {tvResults &&
                movieResults &&
                tvResults.length === 0 &&
                movieResults.length === 0 && (
                  <ErrorMsg type="404" text="Nothing Found" />
                )}
            </>
          )}
        </Container>
      )}
    </>
  );
}

export default Search;
