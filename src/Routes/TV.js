import { useState, useEffect } from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { tvApi } from "../api";
import { noImage, top10 } from "../utils";

import Loader from "../Components/Loader";
import Section from "../Components/Section";
import ErrorMsg from "../Components/ErrorMsg";

const Container = styled.div`
  padding: 1.2rem;
`;

function TV() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { genres },
        } = await tvApi.getGenres();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();

        setPopular(top10(noImage(popular)));
        setTopRated(noImage(topRated));
        setAiringToday(noImage(airingToday));
        setLoading(popular && topRated && airingToday ? false : true);
      } catch {
        setError("오류가 발생했습니다! TV 프로그램 정보를 찾을 수 없습니다.");
      }
    })();
  }, []);
  return (
    <>
      <Helmet>
        <title>TV - Homeflix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {popular && popular.length > 0 && (
            <Section title="오늘 TOP 10 TV 프로그램" cards={popular} />
          )}
          {topRated && topRated.length > 0 && (
            <Section title="꾸준히 인기 많은 TV 프로그램" cards={topRated} />
          )}
          {airingToday && airingToday.length > 0 && (
            <Section title="현재 방영 중인 TV 프로그램" cards={airingToday} />
          )}
          {error && <ErrorMsg type="error" text={error} />}
        </Container>
      )}
    </>
  );
}

export default TV;
