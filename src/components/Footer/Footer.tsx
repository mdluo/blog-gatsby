import React from 'react';
import { graphql as gql, useStaticQuery, Link } from 'gatsby';
import { HeartFillIcon } from '@primer/octicons-react';
import Loadable from '@loadable/component';

const Icon = Loadable(() => import('components/icon'));

interface Props {
  author: string;
}

const Footer: React.FC<Props> = ({ author }) => {
  return (
    <footer className="bg-white border-top border-gray-light pt-4 pb-3">
      <div className="container-md f5 lh-condensed-ultra text-center text-color-secondary">
        <p className="footer-icons">
          <Icon icon="github" id={author} />
          <Icon icon="twitter" id={author} />
          <Icon icon="linkedin" id={author} />
          <Icon icon="goodreads" id={author} />
          <Icon icon="twitch" id={author} />
          <Icon icon="steam" id={author} />
        </p>
        <p>
          Powered by{' '}
          <a
            href="https://github.com/gatsbyjs/gatsby"
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
          &copy; 2014-{new Date().getFullYear()}. Made with
          <HeartFillIcon className="mx-2" size={12} verticalAlign="middle" />
          by {author}.
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
