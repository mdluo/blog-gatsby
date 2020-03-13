import React from 'react';
import moment from 'moment';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Octicon, { Calendar, Tag } from '@primer/octicons-react';
import { GetPostsQuery } from 'generated/types/gatsby';

import Layout from '../components/Layout';

const Index: React.FC = () => {
  const data = useStaticQuery<GetPostsQuery>(graphql`
    query GetPosts {
      allMdx(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { frontmatter: { type: { eq: "post" } } }
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
    }
  `);
  return (
    <Layout padding={false}>
      {(data?.allMdx?.edges ?? []).map(({ node }) => (
        <article className="border-bottom px-3 pt-3 pb-2">
          <Link
            className="text-gray-dark link-hover-gray-light"
            to={node.frontmatter.slug}
          >
            {node.frontmatter.title}
          </Link>
          <p className="f6 text-gray-light mt-2">
            <span className="d-inline-block mr-3">
              <Octicon icon={Calendar} />
              <span className="ml-2">
                {moment(node.frontmatter.date).format('MMM DD, YYYY')}
              </span>
            </span>
            <span className="d-inline-block mr-3">
              <Octicon icon={Tag} />
              <span className="ml-1">
                {(node.frontmatter.tags ?? []).join(', ')}
              </span>
            </span>
          </p>
        </article>
      ))}
    </Layout>
  );
};

export default Index;
