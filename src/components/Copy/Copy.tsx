import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';

interface Props {
  link: string;
}

const Copy: React.FC<Props> = ({ link }) => {
  const [tooltip, setTooltip] = useState(false);
  useEffect(() => {
    const clipboard = new ClipboardJS('.btn-link.text-gray-light');
    clipboard.on('success', () => setTooltip(true));
  });

  return (
    <span
      className={`btn-link text-gray-light ml-1 ${tooltip &&
        'tooltipped tooltipped-s'}`}
      data-clipboard-text={link}
      aria-label="Copied"
      onBlur={() => setTooltip(false)}
      onMouseLeave={() => setTooltip(false)}
    >
      {link}
    </span>
  );
};

export default Copy;
