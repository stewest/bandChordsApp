import classNames from 'classnames';
import React, { useContext } from 'react';
import BodyClassName from 'react-body-classname';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeContext } from '../context/themeContext';

import Header from '../components/Header';

const Layout = ({ children }) => {
  const { themeOption } = useContext(ThemeContext);

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          description
        }
      }
    }
  `);
  return (
    <>
      <Helmet
        title={site.siteMetadata.title}
        defer={false}
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>

      <BodyClassName
        className={classNames('font-mono font-light text-2xl p-4 lg:p-8', {
          dark: !!themeOption,
        })}
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;
