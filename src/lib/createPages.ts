import * as path from 'path';
import graphql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { GatsbyNode } from 'gatsby';

import { LoadPagesQuery } from 'generated/types/gatsby';

/**
 * Export graphql AST for the gatsby-plugin-typegen to generate type definitions
 * https://git.io/JeoRO
 */
export const schema = graphql`
  query loadPages($limit: Int!) {
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
`;

export const createPages: GatsbyNode['createPages'] = async ({
  graphql: graphqlQuery,
  actions,
}) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.tsx`);

  const result = await graphqlQuery<LoadPagesQuery>(print(schema), {
    limit: 1000,
  });

  if (result.errors) {
    console.error(result.errors);
    throw new Error(result.errors);
  }

  /**
   * Optional Chaining and Nullish Coalescing
   * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
   */
  (result?.data?.allMarkdownRemark?.edges ?? []).forEach(({ node }) => {
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
