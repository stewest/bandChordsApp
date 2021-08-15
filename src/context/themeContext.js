import React, { useState, useEffect } from 'react';

export const ThemeContext = React.createContext({
  themeOption: Boolean,
  setThemeOption: () => {},
  wordsSize: Number,
  setWordSize: () => {},
});

const ThemeContextProvider = ({ children }) => {
  const [themeOption, setThemeOption] = useState(null);
  const [wordsSize, setWordSize] = useState(null);

  useEffect(() => {
    function loadTheme() {
      const theme = localStorage.getItem('themeOption');
      return theme;
    }
    setThemeOption(loadTheme());

    function loadWordSize() {
      const size = localStorage.getItem('wordsSize');
      return size;
    }
    setWordSize(loadWordSize());
  }, []);

  useEffect(() => {
    localStorage.setItem('themeOption', themeOption);
  }, [themeOption]);

  useEffect(() => {
    localStorage.setItem('wordsSize', wordsSize);
  }, [wordsSize]);

  return (
    <ThemeContext.Provider
      value={{ themeOption, setThemeOption, wordsSize, setWordSize }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
