import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 330px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Title = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
  font-size: 19px;
  font-weight: 900;
  text-align: center;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Genres = styled.div`
  position: absolute;
  bottom: 25px;
  left: 5px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const Rating = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating},
    ${Title},
    ${Genres} {
      opacity: 1;
    }
  }
`;

const Poster = ({ id, imageUrl, title, rating, genres, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Title>
          {title.length > 18 ? `${title.substring(0.18)}...` : title}
        </Title>
        <Genres>
          {genres.map((genre, index) =>
            genres.length > index + 1 ? `${genre} ・ ` : `${genre}`
          )}
        </Genres>
        <Rating>
          <span role="img" aria-label="rating">
            ⭐️
          </span>
          {` ${rating}`}/10
        </Rating>
      </ImageContainer>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  genres: PropTypes.array,
  isMovie: PropTypes.bool,
};

export default Poster;
