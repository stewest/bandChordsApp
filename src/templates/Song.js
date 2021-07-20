import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import classNames from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Layout from '../layout/Layout';

export default function SingleSongPage({ data: { Song } }) {
  const songObj = Song.songContent;
  const songLines = [];

  const fromWindowTop = 0;
  const [isActiveScroll, setisActiveScroll] = useState(true);

  for (const value of Object.values(songObj)) {
    songLines.push(value.children[0]);
  }

  useScrollPosition(({ prevPos, currPos }) => {
    setisActiveScroll(false);

    // console.log(currPos.y);
    if (currPos.y <= fromWindowTop) {
      setisActiveScroll(true);
    }
  });

  return (
    <Layout>
      <div
        className={classNames('song--main-wrapper text-2xl', {
          active: isActiveScroll,
        })}
      >
        <header>
          <h1 className="font-bold text-6xl mb-2">{Song.label}</h1>
          <ul className="list--inline song--meta">
            <li>
              Tempo: <span className="font-bold">{Song.tempo}</span>
            </li>
            <li>
              Writer: <span className="font-bold">{Song.writer}</span>
            </li>
            <li>
              Time:{' '}
              <span className="font-bold">{Song.songtimesignature.time}</span>
            </li>
          </ul>
        </header>
        <div className="content--wrapper">
          <main className="song--main">
            <div className="active-focus">&nbsp;</div>
            {songLines.map((line) => (
              <div key={line._key} className="song--line">
                {line.marks ? (
                  <span className={line.marks}>{`${line.text}`}</span>
                ) : (
                  line.text
                )}
              </div>
            ))}
          </main>
          <aside className="song--controls bg-black pt-4 lg:pt-0">
            <div className="song--controls grid grid-cols-2 lg:grid-cols-1 gap-2">
              <button
                type="button"
                className="border p-2 w-full mb-0 lg:mb-4 rounded black dark:white dark"
              >
                Start
              </button>
              <button
                type="button"
                className="border p-2 w-full mb-0 lg:mb-4 rounded black dark:white dark"
              >
                Pause
              </button>
              <button
                type="button"
                className="border p-2 w-full mb-0 lg:mb-4 rounded black dark:white dark"
              >
                Stop
              </button>
              <button
                type="button"
                className="border p-2 mb-0 lg:mb-4 w-full rounded black dark:white dark"
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
    Song: sanitySong(slug: { current: { eq: $slug } }) {
      label: name
      name
      id
      tempo
      writer
      songtimesignature {
        time
      }
      songContent {
        children {
          text
          marks
          _type
          _key
        }
      }
    }
  }
`;
