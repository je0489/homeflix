import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import { moviesApi } from "../api";
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
  left: 4.5rem;
  bottom: 18%;
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
  font-size: 1.2rem;

  &::after {
    content: "상세 정보";
    font-weight: 600;
    padding: 0.1rem 0.2rem 0;
  }
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
  const history = useHistory();

  const maxOverViewLength = ({ overview }) => {
    const offset = 100;
    return overview.length > offset ? overview.indexOf(".", offset) : offset;
  };

  const moveToDetail = (id) => {
    history.push({
      pathname: `/tv/${id}`,
      state: { isMovie: false },
    });
  };

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
            >
              <MainBillboardContiner>
                <MoveToDetailButton onClick={() => moveToDetail(billboard.id)}>
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
