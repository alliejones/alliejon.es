import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { Twitter, Github, RSS } from "./icons";

let linkStyle = {
  paddingLeft: "1rem",
  color: "#666",
};

let iconLinkStyle = {
  marginTop: "0.25rem",
  marginLeft: "1rem",
  display: "inline-block",
};

let iconStyle = {
  width: 18,
  height: 18,
  fill: "#666",
};

const Header = ({ siteTitle }) => (
  <header style={{ maxWidth: 1000, margin: "0 auto" }}>
    <div style={{ padding: "0.5rem", paddingLeft: 0 }}>
      <Link
        to="/"
        style={{
          fontSize: "2.5rem",
          fontFamily: "Arvo, serif",
          paddingLeft: "1rem",
        }}
      >
        {siteTitle}
      </Link>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderLeft: 0,
        borderRight: 0,
        padding: "0.2rem 0",
        marginBottom: "2rem",
      }}
    >
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/blog" style={linkStyle}>
          Blog
        </Link>
      </div>
      <div>
        <a href="http://www.twitter.com/gredaline" style={iconLinkStyle}>
          <Twitter style={iconStyle} />
        </a>
        <a href="http://www.github.com/alliejones" style={iconLinkStyle}>
          <Github style={iconStyle} />
        </a>
        <a href="#" style={iconLinkStyle}>
          <RSS style={iconStyle} />
        </a>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
