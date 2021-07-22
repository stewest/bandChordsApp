import React, { useState } from 'react';
import { Link } from 'gatsby';
import Select from 'react-select';
import { SvgPaper } from './icons';

function SetListItem({ setItem }) {
  return (
    <li className="list-none mb-1">
      <SvgPaper />
      <Link
        to={`/setlist/${setItem.slug.current}`}
        className="hover:text-blue-300 transition-colors"
      >
        <span className="mark">{setItem.name}</span>
      </Link>
    </li>
  );
}

export default function SetLists({ sets }) {
  const setsSorted = sets;

  let [filteredSetList, filteredItems] = useState(() => setsSorted || []);

  const filterItems = (e, selector) => {
    if (selector === 'reset' || e === null) {
      filteredItems(setsSorted);
    } else {
      filteredSetList = setsSorted.filter((item) => item.name === e.name);
      filteredItems(filteredSetList);
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
    <div className="setlist mb-4">
      <h2 className="pb-1 text-gray-400">SongLists</h2>

      <Select
        isClearable
        placeholder="Find Set list..."
        options={setsSorted}
        isSearchable
        className="w-full block p-2"
        styles={selectColorStyles}
        option={selectColorStyles.option}
        onChange={(e) => {
          filterItems(e, 'name');
        }}
      />

      <ul className="list mt-8 ml-4">
        {filteredSetList.map((setItem) => (
          <SetListItem key={setItem.id} setItem={setItem} />
        ))}
      </ul>
    </div>
  );
}
