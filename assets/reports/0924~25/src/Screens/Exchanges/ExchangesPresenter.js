import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "../../Components/Loader";

const Container = styled.div``;

const Section = styled.div`
  padding-bottom: 30px;
`;

const Name = styled.span`
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
`;

const Links = styled.div`
  padding-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: underline;
`;

const ExchangesPresenter = ({ exchanges, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {exchanges.map((exchange) => {
        const { id, name, description, links } = exchange;
        return (
          <Section key={id}>
            <Name>{name}</Name>
            {description && `${description.substring(0, 80)}...`}...
            <Links>
              {links &&
                links.website &&
                links.website.map((link, i) => (
                  <Link key={i} href={link}>
                    {link}
                  </Link>
                ))}

              {links?.website[0]}
            </Links>
          </Section>
        );
      })}
    </Container>
  );

ExchangesPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  exchanges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      links: PropTypes.shape({
        website: PropTypes.arrayOf(PropTypes.string.isRequired),
      }),
    }).isRequired
  ).isRequired,
  error: PropTypes.string,
};

export default ExchangesPresenter;
