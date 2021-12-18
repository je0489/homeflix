import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Card = styled(motion.div)`
  background-color: #181818;
  display: block;
  position: absolute;
  bottom: -5.6rem;
  width: 100%;
  height: 6rem;
  padding: 1rem;
  opacity: 0;
  border-radius: 0 0 4px 4px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  min-height: 2rem;
  margin-left: auto;
  padding-top: 0.1rem;
  background-color: #303030;
  border-radius: 99px;
  border: 1.5px solid #595959;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    border: 1.5px solid white;
  }
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  font-weight: 100;
  margin-top: 0.2rem;
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

const cardVariants = {
  hover: {
    opacity: 1,
    zIndex: 5,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

function InfoCard({ title, genres }) {
  return (
    <Card variants={cardVariants}>
      <Header>
        {title}
        <Circle>
          <FontAwesomeIcon icon={faAngleDown} className="fa-angle-down" />
        </Circle>
      </Header>
      <Genres>
        {genres && genres.map((genre, idx) => <Genre key={idx}>{genre}</Genre>)}
      </Genres>
    </Card>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.array,
};

export default InfoCard;
