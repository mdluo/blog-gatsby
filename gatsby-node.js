const path = require('path');
const gql = require('graphql-tag');
const { print } = require('graphql/language/printer');

const LOAD_ALL_MDX_QUERY = print(gql`
  query LoadAllMdx {
    allMdx(
      filter: { fields: { draft: { eq: false } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            slug
          }
        }
      }
    }
  }
`);

// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
exports.createPages = async ({ graphql: useQuery, actions, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('src/templates/post.tsx');

  const result = await useQuery(LOAD_ALL_MDX_QUERY);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    throw new Error(result.errors);
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    const { slug } = node.frontmatter;
    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug,
      },
    });
  });
};

// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateWebpackConfig
// https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/#absolute-imports
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
