import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { TypographyStyle, GoogleFont } from "react-typography";
import styled from "@emotion/styled";

import Header from "./header";
import typography from "../utils/typography";

const Footer = styled.footer`
  text-align: center;
  font-size: 80%;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ fullWidth }) => (fullWidth ? "1000px" : "38rem")};
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

const Layout = ({ children, fullWidth }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <ContentWrapper fullWidth={fullWidth}>
        <main>{children}</main>
        <Footer>© {new Date().getFullYear()} Allie Jones</Footer>
      </ContentWrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
