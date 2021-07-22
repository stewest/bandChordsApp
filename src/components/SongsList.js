import React, { useState } from 'react';
import { Link } from 'gatsby';
import Select from 'react-select';
import compareName from '../utils/functions';
import { SvgMusicNotes } from './icons';

function SingleSong({ song }) {
  return (
    <li className="list-none mb-1">
      <SvgMusicNotes />
      <Link
        to={`/song/${song.slug.current}`}
        className="hover:text-blue-300 transition-colors"
      >
        <span className="mark">{song.name}</span>
      </Link>
    </li>
  );
}

export default function SongList({ songs }) {
  const songsSorted = songs.sort(compareName);

  let [filteredList, filteredItems] = useState(() => songsSorted || []);

  const filterItems = (e, selector) => {
    if (selector === 'reset' || e === null) {
      filteredItems(songsSorted);
    } else {
      filteredList = songsSorted.filter((item) => item.name === e.name);
      filteredItems(filteredList);
    }
  };

  const selectColorStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: `#333`,
      color: '#fff',
    }),
  };

  return (
    <div className="songlist mb-4">
      <h2 className="pb-1 text-gray-400">SongLists</h2>

      <Select
        isClearable
        placeholder="Find Song..."
        options={songsSorted}
        isSearchable
        className="w-full block p-2"
        styles={selectColorStyles}
        option={selectColorStyles.option}
        onChange={(e) => {
          filterItems(e, 'name');
        }}
      />

      <ul className="list mt-8 ml-4">
        {filteredList.map((song) => (
          <SingleSong key={song.id} song={song} />
        ))}
      </ul>
    </div>
  );
}
