import classNames from 'classnames';
import React, { useContext } from 'react';
import BodyClassName from 'react-body-classname';
import { ThemeContext } from '../context/themeContext';
import Header from '../components/Header';

const Layout = ({ children }) => {
  const { themeOption } = useContext(ThemeContext);
  return (
    <>
      <BodyClassName
        className={classNames('font-mono font-light text-xl p-4 lg:p-8', {
          dark: !!themeOption,
        })}
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;
