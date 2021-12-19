import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import { tvApi, moviesApi } from "../api";
import { noImage } from "../utils";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Detail from "../Components/Detail";
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
  const {
    state: { searchTerm },
  } = location;
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
        } = await tvApi.search(searchTerm);
        const {
          data: { genres: movieGenres },
        } = await moviesApi.getGenres();
        const {
          data: { results: movieResults },
        } = await moviesApi.search(searchTerm);

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

        setTvResults(createGenreKey(noImage(tvResults), false));
        setMovieResults(createGenreKey(noImage(movieResults), true));
        setLoading(tvResults && movieResults ? false : true);
      } catch {
        setError(
          "오류가 발생했습니다! 입력한 검색어에 대한 결과를 찾을 수 없습니다."
        );
      }
    })();
  }, [searchTerm]);

  return (
    <>
      <Helmet>Homeflix</Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <SearchTerm>
            검색어 "<p className="term">{searchTerm}</p>"에 대한 검색
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
                  keyword="tvResults"
                  cards={tvResults}
                />
              )}
              {movieResults && movieResults.length > 0 && (
                <Section
                  isMovie={true}
                  title="Movie Resultes"
                  keyword="movieResults"
                  cards={movieResults}
                />
              )}
              <Detail />
              {error && <ErrorMsg type="error" text={error} />}
              {tvResults &&
                movieResults &&
                tvResults.length === 0 &&
                movieResults.length === 0 && (
                  <ErrorMsg type="404" text="Nothing Found" />
                )}
            </>
          )}
          <Detail />
        </Container>
      )}
    </>
  );
}

export default Search;
