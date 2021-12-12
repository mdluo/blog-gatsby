import React from 'react';

import Octocat from 'images/github-corner.svg';

interface Props {
  repo: string;
}

const Corner: React.FC<Props> = ({ repo }) => {
  return (
    <a
      title="GitHub"
      className="github-corner position-absolute top-0 right-0"
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Octocat />
    </a>
  );
};

export default React.memo(Corner);
