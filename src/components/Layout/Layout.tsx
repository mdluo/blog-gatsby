import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import Corner from '../Corner';
import SEO from '../SEO';
import '../../assets/scss/styles.scss';

interface Props {
  height?: 'fit' | 'full';
  padding?: boolean;
}

const Layout: React.FC<Props> = ({
  height = 'fit',
  padding = true,
  children,
}) => {
  return (
    <div className="d-flex flex-column height-full">
      <Header />
      <SEO />
      <div className="flex-auto py-4">
        <div className="container-md height-full">
          <main
            className={`bg-white box-shadow height-${height} rounded-2 ${padding &&
              'py-4 py-md-5 py-lg-5 px-3 px-md-5'}`}
          >
            {children}
          </main>
        </div>
      </div>
      <Footer />
      <Corner />
    </div>
  );
};

export default Layout;
