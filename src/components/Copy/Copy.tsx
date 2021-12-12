import React, { useState, useEffect, createRef } from 'react';
import ClipboardJS from 'clipboard';

interface Props {
  link: string;
}

const Copy: React.FC<Props> = ({ link }) => {
  const ref = createRef<HTMLButtonElement>();
  const [mouseOn, setMouseOn] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const clipboard = new ClipboardJS(ref.current);
      clipboard.on('success', (e: { trigger: HTMLButtonElement }) => {
        setTooltip(true);
        e.trigger.focus();
      });
    }
  }, [ref.current]);

  return (
    <button
      ref={ref}
      className={`btn-link text-color-secondary ${tooltip &&
        'tooltipped tooltipped-s tooltipped-no-delay'}`}
      title="Copy the short link to this post"
      style={mouseOn ? { outline: 'none' } : {}}
      type="button"
      data-clipboard-text={link}
      aria-label="Copied"
      onBlur={() => setTooltip(false)}
      onMouseEnter={() => setMouseOn(true)}
      onMouseLeave={(e) => {
        setMouseOn(false);
        setTooltip(false);
        ref.current.blur();
      }}
    >
      {link}
    </button>
  );
};

export default Copy;
