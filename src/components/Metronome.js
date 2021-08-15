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
        className={classNames('btn', {
          'beat animate-pulsebpm': !!metroStatus,
        })}
        onClick={() => setMetroStatus(!metroStatus)}
        style={{ animationDuration: pulseTime }}
      >
        <SvgLightning />
        {bpm} bpm
      </button>
    </div>
  );
}
