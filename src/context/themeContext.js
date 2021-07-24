import React, { useState, useEffect } from 'react';

export const ThemeContext = React.createContext({
  themeOption: Boolean,
  setThemeOption: () => {},
});

const ThemeContextProvider = ({ children }) => {
  const [themeOption, setThemeOption] = useState(null);

  useEffect(() => {
    function loadTheme() {
      const theme = localStorage.getItem('themeOption');
      return theme;
    }
    setThemeOption(loadTheme());
  }, []);

  useEffect(() => {
    localStorage.setItem('themeOption', themeOption);
  }, [themeOption]);

  return (
    <ThemeContext.Provider value={{ themeOption, setThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
