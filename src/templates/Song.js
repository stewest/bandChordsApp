import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import classNames from 'classnames';
import { animateScroll as scroll, scroller } from 'react-scroll';
import Metronome from '../components/Metronome';
import Layout from '../layout/Layout';
import {
  SvgLeftArrow,
  SvgUpArrow,
  SvgPause,
  SvgStartScroll,
} from '../components/icons';

export default function SingleSongPage({ data: { Song, AllKeys } }) {
  const songObj = Song.songContent;
  const songLines = [];

  for (const value of Object.values(songObj)) {
    songLines.push(value.children[0]);
  }

  const songDuration = Song.songTime ? Song.songTime * 60 * 1000 : 60000;

  const [scrollStatus, setScrollStatus] = useState(false);

  const scrollTo = () => {
    scroller.scrollTo('songEnd', {
      duration: songDuration,
      delay: 0,
      smooth: 'linear',
      ignoreCancelEvents: false,
    });
  };

  const handleStartClick = () => {
    scrollTo();
    setScrollStatus(!scrollStatus);
  };

  const ChordLine = ({ chordChars }) => (
    <span className="chords text-indigo-300">{chordChars}</span>
  );

  const WordLine = ({ wordChars }) => (
    <span className="words">{wordChars}</span>
  );

  const allKeys = AllKeys.keys;
  const keyLinesArray = [];

  for (const value of Object.values(allKeys)) {
    keyLinesArray.push(value.keyName);
  }

  const formatSongLines = (lineContent, marks) => {
    if (lineContent && marks[0] === 'strong') {
      const substrings = keyLinesArray;
      const str = lineContent;

      if (substrings.some((v) => str.includes(v))) {
        return ChordLine({ chordChars: str });
      }
      return WordLine({ wordChars: str });
    }
    return WordLine({ wordChars: lineContent });
  };

  return (
    <Layout>
      <div className={classNames('song--main-wrapper text-2xl')}>
        <header id="top">
          <title>Band Chords | {Song.label}</title>
          <h1 className="font-bold text-5xl mb-2">{Song.label}</h1>
          <ul className="list--inline song--meta pb-8 text-gray-400">
            <li>
              Tempo: <span className="font-bold">{Song.tempo}</span>
            </li>
            <li>
              Writer: <span className="font-bold">{Song.writer}</span>
            </li>
            <li>
              Key: <span className="font-bold">{Song.key.keyName}</span>
            </li>
            {Song.songtimesignature && (
              <li>
                Time:
                <span className="font-bold">
                  &nbsp;{Song.songtimesignature.time}
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
                  <span className={line.marks}>
                    {formatSongLines(line.text, line.marks)}
                  </span>
                ) : (
                  formatSongLines(line.text)
                )}
              </div>
            ))}
          </main>
          <aside className="song--controls bg-white dark:bg-black pt-4 lg:pt-0">
            <div className="song--controls grid grid-cols-2 lg:grid-cols-1 gap-2">
              <Metronome bpm={Song.tempo} />
              <button
                type="button"
                className="btn"
                onClick={() => handleStartClick()}
              >
                <SvgStartScroll />
                Start
              </button>
              <button type="button" className="btn">
                <SvgPause />
                Pause
              </button>
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
      <div id="songEnd" className="song--end">
        &nbsp;
      </div>
    </Layout>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query Song($slug: String!) {
    Song: sanitySong(slug: { current: { eq: $slug } }) {
      label: name
      name
      id
      tempo
      key {
        keyName
      }
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
    AllKeys: allSanityKey {
      keys: nodes {
        keyName
      }
    }
  }
`;
