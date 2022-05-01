import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SvgLightning } from './icons';

export default function Metronome({ bpm }) {
  const [pulseTime, setPulseTime] = useState(1);
  const [metroStatus, setMetroStatus] = useState(false);

  useEffect(() => {
    if (bpm) {
      const setTime = `${(60 / bpm).toFixed(2)}s`;
      setPulseTime(setTime);
    } else {
      const setTime = `${(60 / bpm).toFixed(2)}s`;
      setPulseTime(setTime);
    }
  });

  return (
    <div className="Metronome">
      <button
        type="button"
        className={classNames('btn', {
          'beat animate-pulsebpm': !!metroStatus,
        })}
        onClick={() => setMetroStatus(!metroStatus)}
        style={{ animationDuration: pulseTime }}
        name="Start or Stop Metronome flashing"
        aria-label="Start or Stop Metronome flashing"
      >
        <SvgLightning />
        {bpm} bpm
      </button>
    </div>
  );
}
