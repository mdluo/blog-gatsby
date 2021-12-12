import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql as gql, useStaticQuery, Link } from 'gatsby';
import { AlertIcon } from '@primer/octicons-react';

import Layout from 'components/layout';

export const LOAD_SITE_METADATA_QUERY = gql`
  query LoadSiteMetadata {
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


const NotFoundPage = () => {
  // @ts-ignore
  const data = useStaticQuery<GatsbyTypes.LoadSiteMetadataQuery>(
    LOAD_SITE_METADATA_QUERY
  );
  const { site: { siteMetadata }  } = data;

  return (
    <Layout siteMetadata={siteMetadata}>
      <div className="blankslate blankslate-spacious">
        <AlertIcon className="blankslate-icon" size="large" />
        <h3 className="mb-1">404: Not found</h3>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Link to="/"><button className="btn-link" type="button">Go back</button></Link>
      </div>
      <Helmet>
        <title>404: Not found</title>
      </Helmet>
    </Layout>
  )
};

export default NotFoundPage;
