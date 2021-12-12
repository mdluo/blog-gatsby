import React from 'react';
import { Link } from 'gatsby';
import Loadable from '@loadable/component';

const Toggle = Loadable(() => import('components/toggle'));

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const [who, what] = title.split(`'`);

  return (
    <header className="bg-white box-shadow py-5">
      <div className="clearfix container-md flex-row">
        <h1 className="float-left text-normal px-3">
          <Link className="header-title no-underline" to="/">
            <span className="text-color-blue">{who}</span>
            {what && `'${what}`}
          </Link>
        </h1>
        <span className="float-right px-3">
          <Toggle />
        </span>
      </div>
    </header>
  );
};

export default React.memo(Header);
