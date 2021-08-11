import React from 'react';
import '@fontsource/roboto-mono/100.css';
import '@fontsource/roboto-mono/100-italic.css';
import '@fontsource/roboto-mono/300.css';
import '@fontsource/roboto-mono/300-italic.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/700.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import './src/styles/styles.scss';

import ThemeContextProvider from './src/context/themeContext';
import WakeContextProvider from './src/context/wakeContext';

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>
    <WakeContextProvider>{element}</WakeContextProvider>
  </ThemeContextProvider>
);

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `BandChordsApp has been updated. Reload to display the latest version?`
  );
  if (answer === true) {
    window.location.reload();
  }
};
