import React from 'react';
import Octicon, { Heart } from '@primer/octicons-react';
import { useStaticQuery, graphql } from 'gatsby';
import { FooterQuery } from 'generated/types/gatsby';

const Footer: React.FC = () => {
  const data = useStaticQuery<FooterQuery>(graphql`
    query Footer {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  return (
    <footer className="bg-white border-top border-gray-light pt-4 pb-3">
      <div className="container-md f5 lh-condensed-ultra text-center text-gray-light">
        <p>
          Powered by{' '}
          <a
            href="https://www.gatsbyjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
          . Theme inspired by{' '}
          <a
            href="https://github.com/nandomoreirame/end2end"
            target="_blank"
            rel="noopener noreferrer"
          >
            end2end
          </a>
          .
        </p>
        <p>
          &copy; 2014-{new Date().getFullYear()}. Made with{' '}
          <span style={{ zoom: '85%' }}>
            <Octicon icon={Heart} />
          </span>{' '}
          by {data.site.siteMetadata.author}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
