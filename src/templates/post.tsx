import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { graphql } from 'gatsby';
import ClipboardJS from 'clipboard';
import { DiscussionEmbed } from 'disqus-react';

import Octicon, { Calendar, Tag, Link } from '@primer/octicons-react';
import { GetPostBySlugQuery } from 'generated/types/gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import '../assets/scss/styles.scss';

interface Props {
  data: GetPostBySlugQuery;
}

export const query = graphql`
  query GetPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
        date
        link
        tags
      }
      html
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
    markdownRemark,
    site: { siteMetadata },
  } = data;

  const [tooltip, setTooltip] = useState(false);
  useEffect(() => {
    const clipboard = new ClipboardJS('.btn-link.text-gray-light');
    clipboard.on('success', () => setTooltip(true));
  });

  const { title, date, slug, tags, link } = markdownRemark.frontmatter;

  return (
    <Layout>
      <h1 className="mb-2">{title}</h1>
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
            <span
              className={`btn-link text-gray-light ml-1 ${tooltip &&
                'tooltipped tooltipped-s'}`}
              data-clipboard-text={link}
              aria-label="Copied"
              onBlur={() => setTooltip(false)}
              onMouseLeave={() => setTooltip(false)}
            >
              {link}
            </span>
          </span>
        )}
      </p>
      <div
        className="markdown-body my-5"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
      <DiscussionEmbed
        shortname={siteMetadata.disqus}
        config={{
          title,
          url: link,
          identifier: slug,
        }}
      />
      <SEO title={title} description={markdownRemark.excerpt} />
    </Layout>
  );
};

export default Post;
