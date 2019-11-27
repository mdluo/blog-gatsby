import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CornerQuery } from 'generated/types/gatsby';

import Icon from '../../assets/images/github-corner.svg';
import './Corner.scss';

const Corner: React.FC = () => {
  const data = useStaticQuery<CornerQuery>(graphql`
    query Corner {
      site {
        siteMetadata {
          repo
        }
      }
    }
  `);

  return (
    <a
      className="github-corner position-absolute top-0 right-0"
      href={data.site.siteMetadata.repo}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon />
    </a>
  );
};

export default Corner;
