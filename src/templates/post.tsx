import React from 'react';
import { graphql } from 'gatsby';

import './post.css';

interface Props {
  data: any;
}

const Post: React.FC<Props> = ({ data }) => {
  return <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />;
};

export default Post;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
    }
  }
`;
