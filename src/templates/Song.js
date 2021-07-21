import React from 'react';
import { graphql, navigate } from 'gatsby';
import classNames from 'classnames';
import { animateScroll as scroll, scroller } from 'react-scroll';
import Metronome from '../components/Metronome';
import Layout from '../layout/Layout';

export default function SingleSongPage({ data: { Song } }) {
  const songObj = Song.songContent;
  const songLines = [];

  for (const value of Object.values(songObj)) {
    songLines.push(value.children[0]);
  }

  const songDuration = Song.songTime ? Song.songTime * 60 * 1000 : 60000;

  const scrollTo = () => {
    scroller.scrollTo('songEnd', {
      duration: songDuration,
      delay: 0,
      smooth: 'linear',
      ignoreCancelEvents: false,
    });
  };

  return (
    <Layout>
      <div className={classNames('song--main-wrapper text-2xl')}>
        <header id="top">
          <h1 className="font-bold text-5xl mb-2">{Song.label}</h1>
          <ul className="list--inline song--meta">
            <li>
              Tempo: <span className="font-bold"> {Song.tempo}</span>
            </li>
            <li>
              Writer: <span className="font-bold"> {Song.writer}</span>
            </li>
            {Song.songtimesignature && (
              <li>
                Time:
                <span className="font-bold">
                  {' '}
                  {Song.songtimesignature.time}
                </span>
              </li>
            )}
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
          <aside className="song--controls bg-white dark:bg-black pt-4 lg:pt-0">
            <div className="song--controls grid grid-cols-2 lg:grid-cols-1 gap-2">
              <Metronome bpm={Song.tempo} />
              <button
                type="button"
                className="border p-2 w-full mb-0 lg:mb-4 rounded black dark:white dark"
                onClick={() => scrollTo()}
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
                // href="#top"
                type="button"
                className="border p-2 w-full mb-0 lg:mb-4 rounded black dark:white dark"
                onClick={() => scroll.scrollToTop()}
              >
                Back to Top
              </button>
              <button
                type="button"
                className="border p-2 mb-0 lg:mb-4 w-full rounded black dark:white dark"
                onClick={() => navigate(-1)}
              >
                <span className="text-4xl">&larr;</span> Home
              </button>
            </div>
          </aside>
        </div>
      </div>
      <div id="songEnd" className="song--end">
        &nbsp;
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
      songTime
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
