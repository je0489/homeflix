import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.div)`
  width: calc(100vw - 0.3rem);
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

const Button = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  font-size: 3rem;
  font-weight: 900;
  transition: opacity step-end 1s;
  z-index: 5;

  ${(props) => props.position === "left"} {
    right: 1rem;
  }

  ${({ position }) => position === "right"} {
    left: -1rem;
  }

  &.hidden {
    opacity: 0;
  }

  &:hover:not(.hidden) {
    opacity: 0.6;
    font-size: 4rem;
    margin: -0.3rem -0.24rem 0;
  }
`;

const Card = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 8.5rem;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
`;

const Section = ({ title, cards }) => {
  const offset = 5,
    maxIndex = Math.ceil(cards.length / offset) - 1,
    position = { left: "left", right: "right", both: "both" };
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
              bgUrl={`https://image.tmdb.org/t/p/w300${card.backdrop_path}`}
            />
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
  cards: PropTypes.array,
};

export default Section;
