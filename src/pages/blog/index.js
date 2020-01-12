import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMdx.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Blog" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <small style={{ color: "#999", textTransform: "uppercase" }}>
                {node.frontmatter.date}
              </small>
              <h2>
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
            </article>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const blogListQuery = graphql`
  query blogListQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
          }
          body
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
