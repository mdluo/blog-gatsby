import React from 'react';
import classnames from 'classnames';
import { graphql as gql, useStaticQuery, Link } from 'gatsby';
import { CalendarIcon, TagIcon } from '@primer/octicons-react';
import dayjs from 'dayjs';

import Layout from 'components/layout';

export const LOAD_ALL_POSTS_QUERY = gql`
  query LoadAllPosts {
    allMdx(
      filter: {
        frontmatter: { type: { eq: "post" } }
        fields: { draft: { eq: false } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
            tags
            slug
            publish
            wip
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
          frontmatter: { slug, title, date, tags, publish, wip },
        } = node;
        return (
          <article className="border-bottom px-3 pt-3 pb-2" key={slug}>
            <span className="d-flex flex-items-center">
              {!publish && (
                <span className="State State--small mr-2 f6">Local</span>
              )}
              {wip && (
                <span className="Label Label--secondary mr-2 f6">WIP</span>
              )}
              <Link
                className={classnames({
                  'text-color-primary': publish,
                  'text-color-secondary-muted': !publish,
                })}
                to={slug}
              >
                {title}
              </Link>
            </span>
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
