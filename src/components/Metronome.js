import React, { useState } from 'react';
import classNames from 'classnames';

export default function Metronome({ bpm }) {
  const pulseTime = `${(60 / bpm).toFixed(2)}s`;
  const [metroStatus, setMetroStatus] = useState(false);

  return (
    <div className="Metronome">
      <button
        type="button"
        className={classNames(
          'border p-2 w-full mb-0 lg:mb-4 rounded black dark:white dark',
          {
            'beat animate-pulsebpm': !!metroStatus,
          }
        )}
        onClick={() => setMetroStatus(!metroStatus)}
        style={{ animationDuration: pulseTime }}
      >
        {bpm} bpm
      </button>
    </div>
  );
}
