import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import SEO from "../components/seo";

const ColumnContainer = styled.div`
  @media (min-width: 650px) {
    display: flex;
  }
`;

const Column = styled.div`
  flex-basis: 50%;
  padding: 1rem;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

const IndexPage = () => (
  <Layout fullWidth={true}>
    <SEO title="Home" />
    <ColumnContainer>
      <Column>
        <p>
          Hello! I'm a frontend web developer and former textile designer who
          loves making things for the internet. My interests lie at the
          intersection between excellent code and awesome user interfaces.
        </p>
        <p>
          I'm currently a software engineer at{" "}
          <a href="http://www.etsy.com">Etsy</a> working on frontend
          infrastructure. I'm also a{" "}
          <a href="http://www.recurse.com">Recurse Center</a> alumni and former
          facilitator. When I'm not writing code, I knit, sew, cook and play a
          lot of video games. I live in Brooklyn with my adorably nerdy wife and
          our three-legged cat.
        </p>
      </Column>
      <Column>
        <h3>Favorite blog posts</h3>
        <ul>
          <li>
            <Link to="blog/2014/12/02/adventures-in-knitting-machine-hacking">
              Adventures in knitting machine hacking
            </Link>
          </li>
          <li>
            <Link to="blog/2015/01/25/knitting-machine-hacking-flashing-the-arduino-firmware">
              Knitting machine hacking: flashing the Arduino firmware
            </Link>
          </li>
          <li>
            <Link to="blog/2015/02/01/knitting-machine-hacking-putting-it-all-together">
              Knitting machine hacking: putting it all together
            </Link>
          </li>
        </ul>
      </Column>
    </ColumnContainer>
  </Layout>
);

export default IndexPage;
