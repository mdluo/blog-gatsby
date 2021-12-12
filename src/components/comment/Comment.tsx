import React, { createRef, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';

interface Props {
  repo: string;
}

const THEME_LIGHT = 'github-light';
const THEME_DARK = 'github-dark';

const Comment: React.FC<Props> = ({ repo }) => {
  const ref = createRef<HTMLDivElement>();
  const darkMode = useDarkMode();

  useEffect(() => {
    const iframe: HTMLIFrameElement = document.querySelector('.utterances-frame');
    if (iframe) {
      iframe.contentWindow.postMessage(
        {
          type: 'set-theme',
          theme: darkMode.value ? THEME_DARK : THEME_LIGHT,
        },
        'https://utteranc.es'
      );
    }
  }, [darkMode.value]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute(
      'theme',
      darkMode.value ? THEME_DARK : THEME_LIGHT
    );
    script.crossOrigin = 'anonymous';
    script.async = true;
    ref.current.appendChild(script);
    return () => {
      if (ref.current) {
        ref.current.removeChild(script);
      }
    };
  }, []);

  return <div ref={ref}></div>;
};

export default Comment;
