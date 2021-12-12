import React from 'react';
import useDarkMode from 'use-dark-mode';
import RToggle from 'react-toggle';
import { SunIcon, MoonIcon } from '@primer/octicons-react';

const Toggle: React.FC = () => {
  const darkMode = useDarkMode();
  return (
    <span className="text-white">
      <RToggle
        icons={{
          checked: <MoonIcon verticalAlign="middle" />,
          unchecked: <SunIcon verticalAlign="middle" />,
        }}
        checked={darkMode.value}
        onChange={darkMode.toggle}
        aria-label={`Turn ${darkMode.value ? 'off' : 'on'} dark mode`}
      />
    </span>
  );
};

export default Toggle;
