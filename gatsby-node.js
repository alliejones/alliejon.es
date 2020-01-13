const { createFilePath } = require(`gatsby-source-filesystem`);

const getPosts = require(`./node/get-posts`);
const createBlogPosts = require(`./node/create-pages-blog-posts`);
const generateFeed = require(`./node/on-post-build-generate-feed`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const posts = await getPosts({ graphql });
  await createBlogPosts(createPage, posts);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createRedirect } = actions;

  if (node.internal.type === `Mdx`) {
    const filename = createFilePath({ node, getNode });
    const [, date, titleSlug] = filename.match(
      /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
    );
    const dateSlug = date.split(`-`).join(`/`);
    createNodeField({
      name: `slug`,
      node,
      value: `blog/${dateSlug}/${titleSlug}`,
    });
  }
};

exports.onPostBuild = async ({ graphql }) => {
  await generateFeed({ graphql });
};
