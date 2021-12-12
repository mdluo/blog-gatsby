import React, { useState } from 'react';
import { XIcon } from '@primer/octicons-react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  color?: 'warn' | 'error' | 'success';
  closeable?: boolean;
}

const Alert: React.FC<Props> = ({
  className = '',
  style,
  color,
  closeable = true,
  children,
}) => {
  const [closed, setClosed] = useState(false);

  if (closed) {
    return null;
  }

  return (
    <div
      className={['flash my-2 d-flex ', color ? `flash-${color}` : '', className]
        .filter((v) => !!v)
        .join(' ')}
      style={style}
    >
      <div className="flex-1 break-word">
        {children}
      </div>
      {closeable && (
        <button
          className="flash-close js-flash-close"
          type="button"
          aria-label="Close"
          onClick={() => setClosed(true)}
        >
          <XIcon />
        </button>
      )}
    </div>
  );
};

export default Alert;
