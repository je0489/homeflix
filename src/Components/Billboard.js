import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { makeImageFullUrl } from "../utils";

const Poster = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: ${({ similar }) => (!similar ? "75vh" : "8.5rem")};
  flex-direction: column;
  border-radius: 4px;
  background-image: ${({ similar }) =>
      !similar ? "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))," : null}
    url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center top;

  & > * {
    position: absolute;
  }
`;

const LogoImage = styled.div`
  ${({ logo }) =>
    logo
      ? css`
          background-image: url(${({ logo }) =>
            makeImageFullUrl(logo.file_path, "w500")});
          width: 20rem;
          height: ${({ logo: { height, width } }) =>
            `${(height / width) * 20.83}rem`};
        `
      : css`
          font-size: 3rem;
          font-weight: bolder;
        `};

  background-size: contain;
  background-repeat: no-repeat;
  right: 2rem;
  bottom: 2rem;
`;

export default function Billboard({
  bgUrl,
  logos,
  title,
  similar = false,
  children,
}) {
  return (
    <Poster similar={similar} bgUrl={makeImageFullUrl(bgUrl)}>
      {!similar && (
        <LogoImage logo={logos[logos.length - 1]}>
          {logos.length > 0 ? "" : title}
        </LogoImage>
      )}
      {children}
    </Poster>
  );
}

Billboard.propTypes = {
  bgUrl: PropTypes.string.isRequired,
  logos: PropTypes.array,
  title: PropTypes.string,
  similar: PropTypes.bool,
  children: PropTypes.node,
};
