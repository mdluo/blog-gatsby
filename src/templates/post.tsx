import React from 'react';
import { graphql } from 'gatsby';
import { GetPostBySlugQuery } from 'generated/types/gatsby';

import './post.css';

interface Props {
  data: GetPostBySlugQuery;
}

const Post: React.FC<Props> = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />;
};

export default Post;

export const query = graphql`
  query getPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
    }
  }
`;
