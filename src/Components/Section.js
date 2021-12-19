import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import InfoCard from "./InfoCard";

const Container = styled(motion.div)`
  height: 8.5rem;
  display: flex;
  position: relative;
  :not(:last-child) {
    margin-bottom: 5rem;
  }
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1.12rem;
`;

const RowContainer = styled(motion.div)`
  top: 1.8rem;
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.625rem;
`;

const Button = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  font-size: 3rem;
  font-weight: 900;
  transition: opacity step-end 1s;
  z-index: 3;

  ${(props) => props.position === "left"} {
    right: -1rem;
  }

  ${({ position }) => position === "right"} {
    left: -1rem;
  }

  &.hidden {
    opacity: 0;
    cursor: default;
  }

  &:hover:not(.hidden) {
    opacity: 0.6;
    font-size: 4rem;
    margin: -0.3rem -0.24rem 0;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  background-image: url(${(props) => props.bgUrl});
  height: 8.5rem;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const rowVariants = {
  init: (moveToLeft) => ({
    x: moveToLeft ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (moveToLeft) => ({
    x: moveToLeft ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

const cardVariants = {
  normal: {
    scale: 1,
  },

  hover: {
    scale: 1.3,
    y: -20,
    zIndex: 5,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const Section = ({ title, keyword, cards, isMovie }) => {
  const offset = 5,
    maxIndex = Math.ceil(cards.length / offset) - 1,
    position = { left: "left", right: "right", both: "both" };
  const history = useHistory();
  const movieMatch = useRouteMatch("/movie");
  const searchMatch = useRouteMatch("/search");
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);
  const [back, setBack] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position.left);

  const settingCurrentPosition = (sum) => {
    if (exit) return;
    toggleExitState();
    setIndex((index) => index + sum);
    setCurrentPosition(
      index + sum === 0
        ? position.left
        : index + sum === maxIndex
        ? position.right
        : position.both
    );
  };

  const moveToLeft = () => {
    if (cards && index > 0) {
      setBack(true);
      settingCurrentPosition(-1);
    }
  };

  const moveToRight = () => {
    if (cards && index < maxIndex) {
      setBack(false);
      settingCurrentPosition(1);
    }
  };

  const toggleExitState = () => setExit((prev) => !prev);

  const onCardClicked = (isMovie, id, { searchTerm } = "") => {
    history.push({
      pathname: `/${searchMatch ? "search" : isMovie ? "movie" : "tv"}/${id}`,
      state: { keyword, isMovie, searchTerm },
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Button
        position={"left"}
        onClick={moveToLeft}
        className={currentPosition === position.left ? "hidden" : ""}
      >{`<`}</Button>
      <AnimatePresence
        custom={back}
        initial={false}
        onExitComplete={toggleExitState}
      >
        <RowContainer
          key={index}
          custom={back}
          variants={rowVariants}
          initial="init"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {cards.slice(index * offset, index * offset + offset).map((card) => (
            <Card
              key={card.id}
              layoutId={`${keyword}-${String(card.id)}`}
              bgUrl={`https://image.tmdb.org/t/p/w300${card.backdrop_path}`}
              variants={cardVariants}
              whileHover="hover"
              initial="normal"
              transition={{ type: "tween" }}
              onClick={() =>
                onCardClicked(
                  searchMatch ? isMovie : movieMatch !== null,
                  card.id,
                  history.location.state
                )
              }
            >
              <InfoCard
                title={
                  (searchMatch ? !isMovie : movieMatch !== null)
                    ? card.original_title
                    : card.original_name
                }
                genres={card.genres}
              />
            </Card>
          ))}
        </RowContainer>
      </AnimatePresence>
      <Button
        position={"right"}
        onClick={moveToRight}
        className={currentPosition === position.right ? "hidden" : ""}
      >{`>`}</Button>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  cards: PropTypes.array,
  isMovie: PropTypes.bool,
};

export default Section;
