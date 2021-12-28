import { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { tvApi, moviesApi } from "../api";
import { noImage, makeYoutubeUrl } from "../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";
import Billboard from "./Billboard";

const badge = `
  display: flex;
  width: fit-content;
  align-items: center;
  height: 2em;
  margin-left: -0.2rem;
  padding: 0.1rem 0.5rem;
  border: 1px solid #595959;
  border-radius: 9px;
  font-size: 0.7em;
  font-weight: 300;
  margin-bottom: 0.8rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: 10;
`;

const DeatilContainer = styled(motion.div)`
  position: absolute;
  width: 50rem;
  height: calc(100vh - 25px);
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 4px;
  background-color: #181818;
  letter-spacing: 0.1rem;
  z-index: 99;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  overflow: auto;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1rem;
  right: 1rem;
  min-width: 2rem;
  min-height: 2rem;
  padding-left: 0.065rem;
  background-color: #303030;
  border-radius: 99px;
  border: 1.5px solid #595959;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Detail = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  padding: 1rem 2rem;
  font-weight: 100;
`;

const Date = styled.div`
  display: flex;
  font-size: 0.9rem;

  & div:nth-child(2) {
    margin-left: 0.3rem;

    &::before {
      content: "~";
      margin-right: 0.3rem;
    }
  }
`;

const Title = styled.div`
  margin-top: 0.5rem;
  ${({ similar }) =>
    !similar
      ? `
    font-size: 3rem;
    font-weight: 800;
  `
      : `
    font-size: 0.9rem;
    font-weight: inherit;
  `}
`;

const Genres = styled.div`
  display: flex;
  margin-top: 1.3rem;
  flex-wrap: wrap;
  font-weight: 100;
`;

const Genre = styled.div`
  &:not(:last-child) {
    margin-right: 0.2rem;

    &::after {
      content: "·";
      margin-left: 0.2rem;
      font-weight: 800;
    }
  }
`;

const DetailItem = styled.div`
  margin-top: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  ${({ similar }) =>
    similar &&
    `
    font-size: 0.7rem;
    margin-top: 0;
    color: #f5f5f5;

    &::before {
      background-color: black;
      border: 0 !important;
      color: white;
    }`}

  &::before {
    content: "${({ before }) => before}";
    ${badge};
  }

  &.similars {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
`;

const VideoContainer = styled.div`
  border: 1px solid #585858;
  border-radius: 10px;
  display: flex;
  position: relative;
  padding: 1rem;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Thumbnail = styled.div`
  min-width: 35%;
  overflow: hidden;
  margin-right: 0.8rem;

  & > div {
    background-image: url(${({ url }) => url});
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    height: 11rem;
    margin: -1.5rem 0;
  }
`;

const VideoInfo = styled.p`
  &:last-child {
    position: absolute;
    bottom: 0.4rem;
    right: 0.6rem;
    font-weight: 200;
    font-size: 0.7rem;
    color: #a9a9a9;

    &::before {
      content: "published at: ";
    }
  }
`;

const Similar = styled.div`
  position: relative;
  background-color: #2f2f2f;
  padding-bottom: 1rem;
  border-radius: 10px;
  cursor: pointer;

  &:first-child {
    grid-column: 1 / 2;
  }

  & :not(:first-child) {
    padding: 0.5rem 1rem;
  }
`;

function Details() {
  const detailMatch = useRouteMatch();
  const searchMatch = useRouteMatch("/search");
  const history = useHistory();
  const {
    params: { id },
  } = detailMatch;
  let keyword = "",
    isMovie = false,
    searchTerm = "";
  const { scrollY } = useViewportScroll();
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [title, setTitle] = useState("");

  if (history.location.state)
    ({
      location: {
        state: { keyword, isMovie, searchTerm },
      },
    } = history);
  else isMovie = history.location.pathname.includes("movie");

  useEffect(() => {
    let results = null,
      videos = null,
      similars = null;
    (async () => {
      try {
        if (isNaN(+id)) return null;
        if (!isMovie) {
          ({ data: results } = await tvApi.tvShowDetail(+id));
          ({
            data: { results: videos },
          } = await tvApi.getVideos(+id));
          ({
            data: { results: similars },
          } = await tvApi.getSimilarTvShows(+id));
        } else {
          ({ data: results } = await moviesApi.movieDetail(+id));
          ({
            data: { results: videos },
          } = await moviesApi.getVideos(+id));
          ({
            data: { results: similars },
          } = await moviesApi.getSimilarMovies(+id));
        }
        setDetails(results);
        setTitle(isMovie ? results.original_title : results.original_name);
        setVideos(videos.slice(0, 5));
        setSimilars(noImage(similars).slice(0, 6));
        setLoading(results && videos && similars ? false : true);
      } catch {
        setError(`[${id}] 정보를 찾을 수 없습니다.`);
      }
    })();
    return () => {
      setTitle("");
      setDetails({});
      setVideos([]);
      setSimilars([]);
      setLoading(true);
    };
  }, [isMovie, id]);

  const goBack = () => {
    history.push({
      pathname: `/${detailMatch.path.replace(/\/|:id/g, "")}`,
      state: { searchTerm },
    });
  };

  const onSimilarCardClicked = (id) => {
    containerRef.current.scrollTop = 0;
    history.push({
      pathname: `/${searchMatch ? "search" : isMovie ? "movie" : "tv"}/${id}`,
      state: history.location.state,
    });
  };

  return (
    <>
      <Overlay
        onClick={goBack}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <DeatilContainer
        layoutId={`${keyword}-${id}`}
        style={{ top: scrollY.get() + 25 }}
        ref={containerRef}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Billboard
              bgUrl={details.backdrop_path}
              logos={details.images.logos}
              title={title}
            >
              <CloseButton onClick={goBack}>
                <FontAwesomeIcon icon={faTimes} className="fa-times" />
              </CloseButton>
            </Billboard>
            <Detail>
              <Date>
                {!isMovie ? (
                  <>
                    <div>{details.first_air_date}</div>
                    <div>{details.last_air_date}</div>
                  </>
                ) : (
                  <div>{details.release_date}</div>
                )}
              </Date>
              <Title>{title}</Title>
              <Genres>
                {details.genres.map(({ _, name }, idx) => (
                  <Genre key={idx}>{name}</Genre>
                ))}
              </Genres>
              <DetailItem before={"Description"}>
                {details.overview.length > 0 ? details.overview : "-"}
              </DetailItem>
              <DetailItem before={"Trailers & More"}>
                {videos.length > 0
                  ? videos.map(({ key, name, published_at }) => (
                      <VideoContainer
                        key={key}
                        title={name}
                        onClick={() =>
                          window.open(makeYoutubeUrl("video", key))
                        }
                      >
                        <Thumbnail url={makeYoutubeUrl("thumnail", key)}>
                          <div />
                        </Thumbnail>
                        {[name, published_at.split(" ")[0]].map((val, idx) => (
                          <VideoInfo key={idx}>{val}</VideoInfo>
                        ))}
                      </VideoContainer>
                    ))
                  : "-"}
              </DetailItem>
              <DetailItem className="similars" before={"More Like This"}>
                {similars.length > 0
                  ? similars.map((similar, idx) => (
                      <Similar
                        key={idx}
                        title={
                          !isMovie
                            ? similar.original_name
                            : similar.original_title
                        }
                        onClick={() => onSimilarCardClicked(similar.id)}
                      >
                        <Billboard similar bgUrl={similar.backdrop_path} />
                        <Title similar>
                          {!isMovie
                            ? similar.original_name
                            : similar.original_title}
                        </Title>
                        <DetailItem similar before={"Description"}>
                          {similar.overview.length > 0 ? similar.overview : "-"}
                        </DetailItem>
                      </Similar>
                    ))
                  : "-"}
              </DetailItem>
            </Detail>
          </>
        )}
        {error && <ErrorMsg type="error" text={error} />}
      </DeatilContainer>
    </>
  );
}

export default Details;
