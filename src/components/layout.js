/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql, Link } from "gatsby";
import { TypographyStyle, GoogleFont } from "react-typography";
import { MDXProvider } from "@mdx-js/react";

import Header from "./header";
import typography from "../utils/typography";

const Layout = ({ children }) => {
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
    <MDXProvider components={{ Link }}>
      <Helmet>
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: "38rem",
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer style={{ textAlign: "center" }}>
          <small>© {new Date().getFullYear()} Allie Jones</small>
        </footer>
      </div>
    </MDXProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
