import React, { useState } from 'react';
import { Link } from 'gatsby';
import Select from 'react-select';
import compareName from '../utils/functions';

function SingleSong({ song }) {
  return (
    <li className="list-disc">
      <Link to={`/song/${song.slug.current}`}>
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
    <div className="songlist">
      <h2>SongLists</h2>

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

      <ul className="list mt-4 ml-4">
        {filteredList.map((song) => (
          <SingleSong key={song.id} song={song} />
        ))}
      </ul>
    </div>
  );
}
