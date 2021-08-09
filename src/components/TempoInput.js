import React from 'react';

export default function TempoInput({ bpm, func }) {
  const TempoPatch = (newTempo) => {
    func(newTempo);
  };

  return (
    <label
      htmlFor="setTempo"
      aria-label="setTempo"
      className="text-xs text-center text-blue-300"
    >
      <span className="hidden lg:block">Set Tempo</span>
      <input
        id="setTempo"
        type="number"
        value={bpm || 100}
        onChange={(event) => TempoPatch(event.target.value)}
        placeholder="Set Tempo"
        className="text-blue-500 text-center"
      />
    </label>
  );
}

TempoInput.focus = function () {
  this._tempoInput.focus();
};
