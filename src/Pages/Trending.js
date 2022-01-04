import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import { tvApi, moviesApi, trandingApi } from "../api";
import { noImage, top10 } from "../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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

const MainBillboardContiner = styled.div`
  position: absolute;
  left: 3.5rem;
  bottom: 13%;
  font-weight: 200;
  width: 18rem;
  line-height: 1.2;
`;

const MoveToDetailButton = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 9.5rem;
  height: 2.5rem;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 0.1rem 0.2rem 0;
  cursor: pointer;

  &::after {
    content: "상세 정보";
    font-weight: 600;
    padding: 0 0.2rem;
  }
`;

const CardContainer = styled.div`
  padding: 0 1.2rem;
`;

export default function Trending() {
  const offset = 10;
  const [billboard, setBillboard] = useState({});
  const [random, setRandom] = useState();

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);

  const isMovie = (trendy) => trendy.media_type === "movie";

  useEffect(() => {
    setRandom(Math.floor(Math.random() * offset));
  }, []);

  useEffect(() => {
    // tv show 또는 movie인지 명확하지 않기 때문
    let _billboard = null;
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

        if (!isMovie(allResults[random])) {
          ({ data: _billboard } = await tvApi.tvShowDetail(
            +allResults[random].id
          ));
          _billboard = { ..._billboard, ...{ media_type: "tv" } };
        } else {
          ({ data: _billboard } = await moviesApi.movieDetail(
            +allResults[random].id
          ));
          _billboard = { ..._billboard, ...{ media_type: "movie" } };
        }

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

        setBillboard(_billboard);
        setAllResults(createGenreKey(top10(noImage(allResults))));
        setTvResults(createGenreKey(noImage(tvResults)));
        setMovieResults(createGenreKey(noImage(movieResults)));
        setLoading(
          _billboard && allResults && tvResults && movieResults ? false : true
        );
        setError("");
      } catch (e) {
        setError("오류가 발생했습니다! 대세 콘텐츠 정보를 찾을 수 없습니다.");
      }
    })();
  }, [random]);

  const maxOverViewLength = ({ overview }) => {
    const offset = 100;
    return overview.length > offset ? overview.indexOf(".", offset) : offset;
  };

  const moveToDetail = (id, isMovie) => {
    history.push({
      pathname: `/trending/${id}`,
      state: { isMovie },
    });
  };

  return (
    <>
      <Helmet>
        <title>Trending - Homeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Wrapper>
          {billboard && (
            <Billboard
              bgUrl={billboard.backdrop_path}
              logos={billboard.images.logos}
              title={
                !isMovie(billboard)
                  ? billboard.original_name
                  : billboard.original_title
              }
            >
              <MainBillboardContiner>
                <MoveToDetailButton
                  onClick={() => moveToDetail(billboard.id, isMovie(billboard))}
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="fa-info-circle"
                  />
                </MoveToDetailButton>
                {billboard.overview.length > maxOverViewLength(billboard)
                  ? billboard.overview.slice(0, maxOverViewLength(billboard)) +
                    "..."
                  : billboard.overview}
              </MainBillboardContiner>
            </Billboard>
          )}
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
