import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { tvApi, moviesApi } from "../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Loader from "../Components/Loader";
import ErrorMsg from "../Components/ErrorMsg";

const badge = css`
  display: flex;
  width: fit-content;
  align-items: center;
  height: 1.3rem;
  margin-left: -0.2rem;
  padding: 0.1rem 0.5rem;
  border: 1px solid #595959;
  border-radius: 9px;
  font-size: 0.7rem;
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
`;

const Backdrop = styled.div`
  position: relative;
  display: flex;
  height: 60vh;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgUrl});
  border-radius: 4px;
  background-size: cover;

  & > * {
    position: absolute;
  }
`;

const LogoImage = styled.div`
  ${({ logo }) => logo === ""} {
    background-image: url(${({ logo }) =>
      `https://image.tmdb.org/t/p/w500/${logo.file_path}`});
    width: 20rem;
    height: ${({ logo }) => `${(logo.height / logo.width) * 20.83}rem`};
  }
  ${({ logo }) => logo !== ""} {
    font-size: 3rem;
    font-weight: bolder;
  }
  background-size: contain;
  background-repeat: no-repeat;
  right: 1.5rem;
  bottom: 1rem;
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
  height: 10rem;
  padding: 2rem;
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
  font-size: 3rem;
  font-weight: bolder;
  font-weight: 800;
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

const Descripe = styled.div`
  margin-top: 1.2rem;
  font-weight: 400;
  line-height: 1.2;

  &::before {
    content: "descripe";
    ${badge}
  }
`;

function Details() {
  const detailMatch = useRouteMatch();
  const history = useHistory();
  const {
    params: { id },
  } = detailMatch;
  let keyword = "",
    isMovie = false;
  const { scrollY } = useViewportScroll();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState([]);
  const [title, setTitle] = useState("");

  if (history.state)
    ({
      location: {
        state: { keyword, isMovie },
      },
    } = history);
  else isMovie = history.location.pathname.includes("movie");

  useEffect(() => {
    (async () => {
      let data = null;
      try {
        if (!isMovie) ({ data } = await tvApi.tvShowDetail(+id));
        else ({ data } = await moviesApi.movieDetail(+id));
        setDetails(
          data.images.logos.length > 0
            ? { ...data }
            : { ...data, ...{ images: { logos: [""] } } }
        );
        setTitle(isMovie ? data.original_title : data.original_name);
        setLoading(data ? false : true);
      } catch {
        setError(`[${id}] 정보를 찾을 수 없습니다.`);
      }
    })();
  }, [isMovie, id]);

  const goBack = () => {
    history.push(`/${detailMatch.path.replace(/\/|:id/g, "")}`);
  };

  if (isNaN(+id)) return null;
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
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Backdrop
              bgUrl={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`}
            >
              <CloseButton onClick={goBack}>
                <FontAwesomeIcon icon={faTimes} className="fa-times" />
              </CloseButton>
              <LogoImage
                logo={details.images.logos[details.images.logos.length - 1]}
              >
                {details.images.logos[0] === "" ? title : ""}
              </LogoImage>
            </Backdrop>
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
              <Descripe>
                {details.overview.length > 0 ? details.overview : "-"}
              </Descripe>
            </Detail>
          </>
        )}
        {error && <ErrorMsg type="error" text={error} />}
      </DeatilContainer>
    </>
  );
}

export default Details;
