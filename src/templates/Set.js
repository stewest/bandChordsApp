import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import { animateScroll as scroll } from 'react-scroll';
import Layout from '../layout/Layout';
import { SvgLeftArrow, SvgUpArrow, SvgMusicNotes } from '../components/icons';

export default function setPage({ data: { set } }) {
  const setObj = set.setlistsongs;

  return (
    <Layout>
      <div className="set--main-wrapper text-2xl">
        <header>
          <h1 className="font-bold text-6xl mb-8">{set.setListName}</h1>
          <ul className="list--inline set--meta">
            <li>
              Date: <span className="font-bold">{set.setlistdate}</span>
            </li>
          </ul>
        </header>
        <div className="content--wrapper mt-6">
          <main>
            <ul className="list p">
              {setObj.map((song) => (
                <li key={song.id} className="list-none mb-1">
                  <SvgMusicNotes />
                  <Link to={`/song/${song.slug.current}`}>{song.name}</Link>
                </li>
              ))}
            </ul>
          </main>
          <aside className="song--controls">
            <div>
              <button
                type="button"
                className="btn"
                onClick={() => scroll.scrollToTop()}
              >
                <SvgUpArrow />
                Top
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => navigate(-1)}
              >
                <SvgLeftArrow />
                Home
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query ($slug: String!) {
    set: sanitySetlistdoc(slug: { current: { eq: $slug } }) {
      setListName
      value: setListName
      label: setListName
      setlistdate
      slug {
        current
      }
      setlistsongs {
        name
        id
        slug {
          current
        }
      }
    }
  }
`;
