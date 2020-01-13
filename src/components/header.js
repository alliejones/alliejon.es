import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { css } from "@emotion/core";

import { TwitterIcon, GithubIcon, RSSIcon } from "./icons";

const Header = ({ siteTitle }) => (
  <header
    css={css`
      max-width: 1000px;
      margin: 0 auto;
    `}
  >
    <SiteTitle siteTitle={siteTitle} />
    <MenuBar>
      <MenuColumn>
        <MenuLink to="/">Home</MenuLink>
        <MenuLink to="/blog">Blog</MenuLink>
      </MenuColumn>
      <MenuColumn>
        <IconLink to="http://www.twitter.com/gredaline">
          <TwitterIcon />
        </IconLink>
        <IconLink to="http://www.github.com/alliejones">
          <GithubIcon />
        </IconLink>
        <IconLink to="/atom.xml">
          <RSSIcon />
        </IconLink>
      </MenuColumn>
    </MenuBar>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

const SiteTitle = ({ siteTitle }) => (
  <div
    css={css`
      padding: 0.5rem;
      padding-left: 0;
    `}
  >
    <Link
      to="/"
      css={css`
        font-size: 2.5rem;
        font-family: Arvo, serif;
        padding-left: 1rem;
      `}
    >
      {siteTitle}
    </Link>
  </div>
);

const MenuBar = ({ children }) => (
  <div
    css={css`
      display: flex;
      justify-content: space-between;
      border: 1px solid #ccc;
      border-left: 0;
      border-right: 0;
      padding: 0.2rem 0;
      margin-bottom: 2rem;
    `}
  >
    {children}
  </div>
);

const MenuColumn = ({ children }) => <div>{children}</div>;

const IconLink = ({ to, children }) => (
  <a
    href={to}
    css={css`
      color: #666;
      display: inline-block;
      margin: 0.25rem 1rem 0 0;

      svg {
        height: 18px;
        fill: #666;
        width: 18px;
      }
    `}
  >
    {children}
  </a>
);

const MenuLink = ({ to, children }) => (
  <Link
    to={to}
    css={css`
      padding-left: 1rem;
      color: #666;
    `}
  >
    {children}
  </Link>
);

export default Header;
