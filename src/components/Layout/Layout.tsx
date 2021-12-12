import React from 'react';
import { Helmet } from 'react-helmet';

import Header from 'components/header';
import Footer from 'components/footer';
import Corner from 'components/corner';

interface Props {
  height?: 'fit' | 'full';
  padding?: boolean;
  siteMetadata: {
    title: string;
    description: string;
    author: string;
    repo: string;
  };
}

const Layout: React.FC<Props> = ({
  height = 'fit',
  padding = true,
  siteMetadata,
  children,
}) => {
  const { title, description, author, repo } = siteMetadata;
  return (
    <>
      <Helmet titleTemplate={`%s | ${title}`} defaultTitle={title}>
        <html lang="en" />
        <meta name="description" content={description} />
      </Helmet>
      <div className="d-flex flex-column height-full">
        <Header title={title} />
        <div className="flex-auto py-4">
          <div className="container-md height-full">
            <main
              className={`bg-white box-shadow height-${height} rounded-md-2 ${
                padding && 'py-4 py-md-5 py-lg-5 px-3 px-md-5'
              }`}
            >
              {children}
            </main>
          </div>
        </div>
        <Footer author={author} />
      </div>
      <Corner repo={repo} />
    </>
  );
};

export default Layout;
