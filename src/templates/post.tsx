import React from 'react';
import moment from 'moment';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { DiscussionEmbed } from 'disqus-react';

import Octicon, { Calendar, Tag, Link } from '@primer/octicons-react';
import { GetPostBySlugQuery } from 'generated/types/gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Copy from '../components/Copy';
import '../assets/scss/styles.scss';

interface Props {
  data: GetPostBySlugQuery;
}

export const query = graphql`
  query GetPostBySlug($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        type
        slug
        title
        date
        link
        tags
      }
      body
      excerpt
    }
    site {
      siteMetadata {
        disqus
      }
    }
  }
`;

const Post: React.FC<Props> = ({ data }) => {
  const {
    mdx,
    site: { siteMetadata },
  } = data;

  const { type, title, date, slug, tags, link } = mdx.frontmatter;

  return (
    <Layout>
      <h1 className="mb-2">{title}</h1>

      {type === 'post' && (
        <p className="f5 text-gray-light">
          <span className="d-inline-block mr-3">
            <Octicon icon={Calendar} />
            <span className="ml-2">{moment(date).format('MMM DD, YYYY')}</span>
          </span>
          <span className="d-inline-block mr-3">
            <Octicon icon={Tag} />
            <span className="ml-1">{(tags ?? []).join(', ')}</span>
          </span>
          {link && (
            <span className="d-inline-block mr-3">
              <Octicon icon={Link} />
              <Copy link={link} />
            </span>
          )}
        </p>
      )}
      <div className="markdown-body mt-5 mb-6">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
      <DiscussionEmbed
        shortname={siteMetadata.disqus}
        config={{
          title,
          url: link,
          identifier: slug,
        }}
      />
      <SEO title={title} description={mdx.excerpt} />
    </Layout>
  );
};

export default Post;
