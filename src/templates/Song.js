import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import classNames from 'classnames';
import { animateScroll as scroll, scroller } from 'react-scroll';
import TempoInput from '../components/TempoInput';
import Metronome from '../components/Metronome';
import Layout from '../layout/Layout';

import {
  SvgLeftArrow,
  SvgUpArrow,
  SvgPause,
  SvgStartScroll,
} from '../components/icons';

export default function SingleSongPage({ data: { Song, AllKeys } }) {
  const activeScroll = false;
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
    <div className="chords text-indigo-300 mt-6">{chordChars}</div>
  );

  const WordLine = ({ wordChars }) => (
    <div className="words font-normal">{wordChars}</div>
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

  const [currentTempo, setCurrentTempo] = useState(Song.tempo);

  return (
    <Layout>
      <div className={classNames('song--main-wrapper text-2xl')}>
        <div className="header--meta" id="top">
          <title>Band Chords | {Song.label}</title>
          <h1 className="font-bold text-2xl md:text-5xl mb-2">{Song.label}</h1>
          <ul className="list--inline song--meta pb-8 text-gray-400 text-base md:text-2xl">
            <li className="font-light">
              Tempo: <span className="font-bold">{Song.tempo}</span>
            </li>
            <li className="font-light">
              Writer: <span className="font-bold">{Song.writer}</span>
            </li>
            <li className="font-light">
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
        </div>
        <div className="content--wrapper font-chords">
          <main className="song--main">
            {activeScroll && <div className="active-focus">&nbsp;</div>}

            {songLines.map((line) => (
              <div key={line._key} className="song--line">
                {line.marks ? (
                  <div className={line.marks}>
                    {formatSongLines(line.text, line.marks)}
                  </div>
                ) : (
                  formatSongLines(line.text)
                )}
              </div>
            ))}
          </main>
          <aside className="song--controls bg-white dark:bg-black pt-4 lg:pt-0">
            <div className="song--controls grid grid-cols-3 md:grid-cols-6 lg:grid-cols-1 gap-2">
              <TempoInput bpm={currentTempo} func={setCurrentTempo} />
              <Metronome bpm={currentTempo} />
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
                Back
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
        _key
        _type
        style
        list
        _rawChildren
        children {
          _key
          _type
          marks
          text
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
