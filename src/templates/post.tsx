import React, { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql as gql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import {
  ClockIcon,
  StopIcon,
  CalendarIcon,
  TagIcon,
  CopyIcon,
} from '@primer/octicons-react';
import { Googletranslate } from '@icons-pack/react-simple-icons';
import Loadable from '@loadable/component';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Layout from 'components/layout';
import Copy from 'components/copy';
import Comment from 'components/comment';

dayjs.extend(relativeTime);

const Alert = Loadable(() => import('components/alert'));

interface Props {
  data: GatsbyTypes.LoadPostQuery;
}

/**
 * Gatsby implicitly extract the query, run it and inject the result by `props.data`
 * https://www.gatsbyjs.com/docs/how-to/querying-data/page-query
 */
export const LOAD_POST_QUERY = gql`
  query LoadPost($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        type
        slug
        title
        date
        link
        tags
        keywords
        lasting
        translated
        invalid
        no_comment
      }
      body
      excerpt
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

const Post: React.FC<Props> = ({ data }) => {
  const { mdx, site: { siteMetadata } } = data;
  const {
    type,
    title,
    date,
    tags,
    keywords,
    link,
    lasting,
    translated,
    invalid,
    no_comment,
  } = mdx.frontmatter;

  useLayoutEffect(() => {
    const pres = document.querySelectorAll<HTMLPreElement>('pre.grvsc-container');
    pres.forEach((pre) => {
      const code = pre.querySelector('code');
      const div = document.createElement('div');
      div.classList.add('overflow-x-auto');
      pre.appendChild(div);
      div.appendChild(code);
      pre.classList.add('overflow-x-hidden');

      if (pre.className.includes('prompt-')) {
        pre.querySelectorAll<HTMLSpanElement>('.grvsc-line').forEach((line) => {
          const source = line.querySelector<HTMLSpanElement>('.grvsc-source > span');
          if (!source || !source.innerText.trim().length || source.innerText.startsWith(' ')) {
            line.querySelector('.grvsc-line-number').classList.add('no-line-number');
          }
        });
      }
    });
  }, []);

  const now = dayjs();
  const createdAt = dayjs(date);
  const outdated = lasting || createdAt.isBefore(now.subtract(2, 'year'));

  return (
    <Layout siteMetadata={siteMetadata}>
      <h1 className="f3 mb-2">{title}</h1>
      {type === 'post' && (
        <p className="f5 text-color-secondary">
          <span className="d-inline-block mr-3">
            <CalendarIcon className="mr-2" size={12} verticalAlign="unset" />
            {createdAt.format('DD MMM, YYYY')}
          </span>
          {tags && (
            <span className="d-inline-block mr-3">
              <TagIcon className="mr-1" size={12} verticalAlign="unset" />
              {tags.join(', ')}
            </span>
          )}
          {link && (
            <span className="d-inline-block mr-3">
              <CopyIcon
                className="mr-1"
                size={12}
                verticalAlign="unset"
              />
              <Copy link={link} />
            </span>
          )}
        </p>
      )}
      {!invalid && outdated && (
        <Alert>
          <ClockIcon />
          This post was written more than {createdAt.fromNow()}, some
          information may be outdated.
        </Alert>
      )}
      {!invalid && translated && (
        <Alert color="warn">
          <Googletranslate className="octicon" size="1em" />
          This post was translated by Google, some wording may be incorrect.
        </Alert>
      )}
      {invalid && (
        <Alert color="error" closeable={false}>
          <StopIcon />
          This post is no longer valid (likely due to the content is way too outdated).
        </Alert>
      )}
      {!invalid && (
        <article className="markdown-body my-4">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </article>
      )}
      {!(invalid || no_comment) && (
        <>
          <hr />
          <Comment repo={siteMetadata.repo} />
        </>
      )}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={mdx.excerpt} />
        {keywords?.length && (
          <meta name="keywords" content={keywords.join(',')} />
        )}
      </Helmet>
    </Layout>
  );
};

export default Post;
