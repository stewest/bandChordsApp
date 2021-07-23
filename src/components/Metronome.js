import React, { useState } from 'react';
import classNames from 'classnames';
import { SvgLightning } from './icons';

export default function Metronome({ bpm }) {
  const pulseTime = `${(60 / bpm).toFixed(2)}s`;
  const [metroStatus, setMetroStatus] = useState(false);

  return (
    <div className="Metronome">
      <button
        type="button"
        className={classNames(
          'border p-2 w-full mb-0 lg:mb-4 rounded-md shadow text-black dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors border-gray-500 font-sans',
          {
            'beat animate-pulsebpm': !!metroStatus,
          }
        )}
        onClick={() => setMetroStatus(!metroStatus)}
        style={{ animationDuration: pulseTime }}
      >
        <SvgLightning />
        {bpm} bpm
      </button>
    </div>
  );
}
