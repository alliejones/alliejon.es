const fs = require("fs-extra");
const path = require("path");
const { Feed } = require("feed");

const publicPath = `./public`;

module.exports = async ({ graphql }) => {
  const result = await graphql(`
    {
      site {
        siteMetadata {
          title
          authorName
          authorEmail
          siteUrl
        }
      }
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            html
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "YYYY-MM-DDTHH:mm:ss.sssZ")
            }
          }
        }
      }
    }
  `);

  const metadata = result.data.site.siteMetadata;
  const posts = result.data.allMdx.edges;

  const feed = new Feed({
    title: metadata.title,
    description: metadata.description,
    id: metadata.url,
    feedLinks: {
      atom: metadata.siteUrl + "/atom.xml",
    },
    author: {
      name: metadata.authorName,
      email: metadata.authorEmail,
    },
  });

  posts.forEach(edge => {
    let post = edge.node;

    // hackily make internal links absolute
    let content = post.html.replace(
      /<a href=("|')\//,
      `<a href=$1${metadata.siteUrl}/`
    );

    feed.addItem({
      title: post.frontmatter.title,
      id: metadata.siteUrl + "/" + post.fields.slug,
      link: metadata.siteUrl + "/" + post.fields.slug,
      content,
      date: new Date(post.frontmatter.date),
    });
  });

  const outputPath = path.join(publicPath, "atom.xml");
  const outputDir = path.dirname(outputPath);
  if (!(await fs.exists(outputDir))) {
    await fs.mkdirp(outputDir);
  }

  await fs.writeFile(outputPath, feed.atom1());
};
