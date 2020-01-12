import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import { MDXRenderer } from "gatsby-plugin-mdx";

import SEO from "../components/seo";
import Layout from "../components/layout";

export default ({ data }) => {
  const post = data.mdx;
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <PostDate date={post.frontmatter.date} />
        <h1>{post.frontmatter.title}</h1>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
    </Layout>
  );
};

const PostDate = ({ date }) => (
  <span
    css={css`
      color: #999;
      text-transform: uppercase;
    `}
  >
    {date}
  </span>
);

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`;
