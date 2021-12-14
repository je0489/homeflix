import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Poster from "../../Components/Poster";
import ErrorMsg from "../../Components/ErrorMsg";

const Container = styled.div`
  padding: 1.2rem;
`;

const DetailPresenter = ({ topRated, popular, airingToday, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {popular && popular.length > 0 && (
        <Section title="오늘 TOP 10 TV 프로그램">
          {popular.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.backdrop_path}
              title={show.original_name}
              rating={show.vote_average}
              genres={show.genre_ids}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title="꾸준히 인기 많은 TV 프로그램">
          {topRated.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.backdrop_path}
              title={show.original_name}
              rating={show.vote_average}
              genres={show.genre_ids}
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="현재 방영 중인 TV 프로그램, 지금 방송 중인 TV 프로그램">
          {airingToday.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.backdrop_path}
              title={show.original_name}
              rating={show.vote_average}
              genres={show.genre_ids}
            />
          ))}
        </Section>
      )}
      {error && <ErrorMsg type="error" text={error} />}
    </Container>
  );

DetailPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
