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

export const wrapRootElement = ({ element }) => (
  <ThemeContextProvider>{element}</ThemeContextProvider>
);
