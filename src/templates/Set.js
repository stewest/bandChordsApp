import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import Layout from '../layout/Layout';

export default function setPage({ data: { set } }) {
  const setObj = set.setlistsongs;

  return (
    <Layout>
      <div className="set--main-wrapper text-2xl">
        <header>
          <h1 className="font-bold text-6xl mb-2">{set.setListName}</h1>
          <ul className="list--inline set--meta">
            <li>
              Date: <span className="font-bold">{set.setlistdate}</span>
            </li>
          </ul>
        </header>
        <div className="content--wrapper">
          <main>
            <ul className="list p">
              {setObj.map((song) => (
                <li key={song.id} className="list-disc">
                  <Link to={`/song/${song.slug.current}`}>{song.name}</Link>
                </li>
              ))}
            </ul>
          </main>
          <aside className="song--controls">
            <div>
              <button
                type="button"
                className="border p-2 mb-4 w-full rounded black dark:white dark"
                onClick={() => navigate(-1)}
              >
                Go Back
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
