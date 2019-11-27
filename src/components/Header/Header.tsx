import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { HeaderQuery } from 'generated/types/gatsby';

const Header: React.FC = () => {
  const data = useStaticQuery<HeaderQuery>(graphql`
    query Header {
      site {
        siteMetadata {
          title
          author
          menu
        }
      }
    }
  `);
  const { author, menu } = data.site.siteMetadata;

  return (
    <header className="bg-white box-shadow py-5">
      <div className="clearfix container-md flex-row">
        <h1 className="f3 float-left text-normal px-3">
          <Link className="link-hover-gray-dark text-gray-light" to="/">
            <span className="text-blue">{author}</span>
            's blog
          </Link>
        </h1>
        <nav className="float-right">
          <ul>
            {menu.map((item: string) => (
              <li key={item} className="d-inline-block">
                <Link
                  className="f4-light lh-3 link-hover-gray-light px-3 text-gray"
                  to={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
