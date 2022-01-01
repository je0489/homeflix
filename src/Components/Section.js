import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { makeImageFullUrl } from "../utils";
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
  margin-left: 0.4rem;
`;

const RowContainer = styled(motion.div)`
  top: 2rem;
  width: 100%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.625rem;
`;

const MoveButton = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  font-size: 3rem;
  font-weight: 900;
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

  ${({ isPopular }) =>
    isPopular &&
    css`
      &::before {
        content: "${({ rank }) => rank}";
        font-size: 9rem;
        font-weight: 900;
        color: transparent;
        -webkit-text-stroke: 3px #f9f9f9;
        display: flex;
        justify-content: end;
        line-height: normal;
        position: absolute;
      }
    `}

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
    position = { left: "left", right: "right", both: "both", none: "none" };
  const history = useHistory();
  const movieMatch = useRouteMatch("/movie");
  const searchMatch = useRouteMatch("/search");
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);
  const [back, setBack] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position.none);

  useEffect(() => {
    if (cards.length > 5) setCurrentPosition(position.left);
  }, [cards.length, position.left]);

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
      <MoveButton
        position={"left"}
        onClick={moveToLeft}
        className={
          [position.left, position.none].includes(currentPosition)
            ? "hidden"
            : ""
        }
      >{`<`}</MoveButton>
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
              bgUrl={makeImageFullUrl(card.backdrop_path, "w300")}
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
                  (searchMatch ? isMovie : movieMatch !== null)
                    ? card.original_title
                    : card.original_name
                }
                genres={card.genres}
              />
            </Card>
          ))}
        </RowContainer>
      </AnimatePresence>
      <MoveButton
        position={"right"}
        onClick={moveToRight}
        className={
          [position.right, position.none].includes(currentPosition)
            ? "hidden"
            : ""
        }
      >{`>`}</MoveButton>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  cards: PropTypes.array,
  isPopular: PropTypes.bool,
  isMovie: PropTypes.bool,
};

export default Section;
