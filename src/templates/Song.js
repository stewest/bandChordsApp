import React, { useState, useContext } from 'react';
import { graphql, navigate } from 'gatsby';
import classNames from 'classnames';
import { animateScroll as scroll, scroller } from 'react-scroll';
import TempoInput from '../components/TempoInput';
import Metronome from '../components/Metronome';
import Layout from '../layout/Layout';
import { ThemeContext } from '../context/themeContext';

import {
  SvgLeftArrow,
  SvgUpArrow,
  SvgPause,
  SvgStartScroll,
} from '../components/icons';

export default function SingleSongPage({ data: { Song, AllKeys } }) {
  const { wordsSize, setWordSize } = useContext(ThemeContext);
  const activeScroll = false;
  const songObj = Song.songContent;
  const songLines = [];

  for (const value of Object.values(songObj)) {
    songLines.push(value.children[0]);
  }

  const songDuration = Song.songTime ? Song.songTime * 60 * 1000 : 120000;

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
    <div className="text-blue-300 mt-6">
      {chordChars.replace(/ /g, '\u200A')}
    </div>
  );
  // u200A

  const SectionLine = ({ sectionChars }) => (
    <div className="words-section font-semibold">{sectionChars}</div>
  );

  const WordLine = ({ wordChars }) => (
    <span className="words font-normal">{wordChars}</span>
  );

  const allKeys = AllKeys.keys;
  const keyLinesArray = [];

  for (const value of Object.values(allKeys)) {
    keyLinesArray.push(value.keyName);
  }

  const formatSongLines = (lineContent, marks) => {
    // console.log(marks);
    // console.log(lineContent);
    if (
      (lineContent && marks[0] === 'chords') ||
      (lineContent && marks[0] === 'strong')
    ) {
      const substrings = keyLinesArray;
      const str = lineContent;

      if (substrings.some((v) => str.includes(v))) {
        return ChordLine({ chordChars: str });
      }
      return WordLine({ wordChars: str });
    }
    if (lineContent && marks[0] === 'section') {
      return SectionLine({ sectionChars: lineContent });
    }
    if (lineContent && marks[0] === 'highlight') {
      return WordLine({ wordChars: lineContent });
    }
    return WordLine({ wordChars: lineContent });
  };

  const [currentTempo, setCurrentTempo] = useState(Song.tempo ? Song.tempo : 0);

  return (
    <Layout>
      <div
        className={classNames('song--main-wrapper', {
          'text-2xl': wordsSize === 2,
          'text-3xl': wordsSize === 3,
          'text-4xl': wordsSize === 4,
        })}
      >
        <div className="header--meta" id="top">
          <title>Band Chords | {Song.label}</title>
          <h1 className="font-bold text-2xl md:text-5xl mb-2">{Song.label}</h1>
          <ul className="list--inline song--meta pb-8 text-gray-400 text-base md:text-2xl">
            <li className="font-light">
              Tempo:{' '}
              <span className="font-bold">{Song.tempo ? Song.tempo : 0}</span>
            </li>
            <li className="font-light">
              Writer:{' '}
              <span className="font-bold">
                {Song.writer ? Song.writer : 'Unknown'}
              </span>
            </li>
            <li className="font-light">
              Key:{' '}
              <span className="font-bold">
                {Song.key.keyName ? Song.key.keyName : unknown}
              </span>
            </li>
            {Song.songtimesignature && (
              <li>
                Time:
                <span className="font-bold">
                  &nbsp;
                  {Song.songtimesignature.time
                    ? Song.songtimesignature.time
                    : 'non'}
                </span>
              </li>
            )}
            {Song.songpatch && (
              <li className="block">
                Patch:{' '}
                <span className="font-bold text-blue-200">
                  {Song.songpatch}
                </span>
              </li>
            )}
          </ul>
          {Song.notes && (
            <div className="mb-4 text-gray-400 text-lg">
              Notes: {Song.notes ? Song.notes : 'none'}
            </div>
          )}
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

              {!scrollStatus && (
                <button
                  type="button"
                  className="btn"
                  aria-label="Start song Scrolling down"
                  onClick={() => handleStartClick()}
                >
                  <SvgStartScroll />
                  Start
                </button>
              )}

              {scrollStatus && (
                <button
                  type="button"
                  className="btn"
                  aria-label="Pause Scroll"
                  onClick={() => setScrollStatus(!scrollStatus)}
                >
                  <SvgPause />
                  Pause
                </button>
              )}
              <button
                type="button"
                className="btn"
                aria-label="Scroll to top"
                onClick={() => scroll.scrollToTop()}
              >
                <SvgUpArrow />
                Top
              </button>

              {wordsSize !== 3 && (
                <button
                  aria-label="Increase word size"
                  type="button"
                  className="btn"
                  onClick={() => setWordSize(3)}
                >
                  Font ++
                </button>
              )}

              {wordsSize === 3 && (
                <button
                  type="button"
                  className="btn"
                  aria-label="Reset word size"
                  onClick={() => setWordSize(2)}
                >
                  Font Reset
                </button>
              )}

              <button
                type="button"
                className="btn"
                aria-label="Navigate back 1"
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
      songpatch
      notes
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
