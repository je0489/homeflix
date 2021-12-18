import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";

// const Container = styled.div``;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: calc(100vw / 5 - 1.2rem);
  height: 8.5rem;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
`;

const ImageContainer = styled(motion.div)`
  margin-right: 0.4rem;
  margin-bottom: 0.3rem;
  z-index: 3;
`;

const imageVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.5,
    },
  },
};

const Poster = ({ title, imageUrl }) => (
  <ImageContainer whileHover="hover" variants={imageVariants}>
    <Image
      title={title}
      bgUrl={
        imageUrl
          ? `https://image.tmdb.org/t/p/w300${imageUrl}`
          : require("../assets/noPosterSmall.png")
      }
    />
  </ImageContainer>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
