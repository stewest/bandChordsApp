import React from 'react';

export default function TempoInput({ bpm, func }) {
  const TempoPatch = (newTempo) => {
    func(newTempo);
  };

  return (
    <div>
      <input
        type="number"
        value={bpm}
        onChange={(event) => TempoPatch(event.target.value)}
        placeholder="Set Tempo"
        className="text-blue-500 text-center"
      />
    </div>
  );
}

TempoInput.focus = function () {
  this._tempoInput.focus();
};
