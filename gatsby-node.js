/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.tsx`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  const allMarkdownRemark = await graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allMarkdownRemark(
          limit: $limit
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
                draft
                slug
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  );
  if (allMarkdownRemark.errors) {
    console.error(allMarkdownRemark.errors);
    throw new Error(allMarkdownRemark.errors);
  }

  // Create index page.
  allMarkdownRemark.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug } = node.frontmatter;
    createPage({
      // Path for this page — required
      path: slug,
      component: postTemplate,
      context: {
        // Add optional context data to be inserted
        // as props into the page component..
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
        slug,
      },
    });
  });
};
