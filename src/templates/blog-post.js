import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import SEO from "../components/seo";
import Layout from "../components/layout";

export default ({ data }) => {
  const post = data.mdx;
  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <small style={{ color: "#999", textTransform: "uppercase" }}>
          {post.frontmatter.date}
        </small>
        <h1>{post.frontmatter.title}</h1>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
    </Layout>
  );
};
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
