import React from 'react';
import { graphql as gql, useStaticQuery, Link } from 'gatsby';
import { CalendarIcon, TagIcon } from '@primer/octicons-react';
import dayjs from 'dayjs';

import Layout from 'components/layout';

export const LOAD_ALL_POSTS_QUERY = gql`
  query LoadAllPosts {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { type: { eq: "post" } }, fields: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            tags
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
        repo
      }
    }
  }
`;

const Index: React.FC = () => {
  const data =
    // @ts-ignore
    useStaticQuery<GatsbyTypes.LoadAllPostsQuery>(LOAD_ALL_POSTS_QUERY);
  const {
    allMdx,
    site: { siteMetadata },
  } = data;

  return (
    <Layout padding={false} siteMetadata={siteMetadata}>
      {allMdx.edges.map(({ node }) => {
        const {
          frontmatter: { slug, title, date, tags },
        } = node;
        return (
          <article className="border-bottom px-3 pt-3 pb-2" key={slug}>
            <Link className="text-color-primary" to={slug}>
              {title}
            </Link>
            <p className="f6 mt-2 text-color-secondary">
              <span className="d-inline-block mr-3">
                <CalendarIcon size={14} verticalAlign="text-top" />
                <span className="ml-2">
                  {dayjs(date).format('DD MMM, YYYY')}
                </span>
              </span>
              <span className="d-inline-block mr-3">
                <TagIcon size={14} verticalAlign="text-top" />
                <span className="ml-1">{(tags ?? []).join(', ')}</span>
              </span>
            </p>
          </article>
        );
      })}
    </Layout>
  );
};

export default Index;
