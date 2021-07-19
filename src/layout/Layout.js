import classNames from 'classnames';
import React, { useState } from 'react';
import BodyClassName from 'react-body-classname';

export default function Layout({ children }) {
  const [themeOption, setThemeOption] = useState(true);

  return (
    <>
      <BodyClassName
        className={classNames('font-mono text-xl p-8', {
          dark: !!themeOption,
        })}
      />
      <header className="layout--header">
        <button
          type="button"
          className={classNames(
            'theme-toggle border p-2 rounded black dark:white dark',
            themeOption ? 'dark' : 'light'
          )}
          onClick={() => setThemeOption(!themeOption)}
        >
          <div>Switch to {themeOption ? 'Light' : 'Dark'} Theme</div>
        </button>
      </header>

      {children}
    </>
  );
}
