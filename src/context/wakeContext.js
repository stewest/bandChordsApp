import React, { useState, useEffect } from 'react';

export const WakeContext = React.createContext({
  wakeOption: Boolean,
  setWakeOption: () => {},
});

const WakeContextProvider = ({ children }) => {
  const [wakeOption, setWakeOption] = useState(null);

  useEffect(() => {
    function loadWake() {
      const awake = localStorage.getItem('wakeOption');
      return awake;
    }
    setWakeOption(loadWake());
  }, []);

  useEffect(() => {
    localStorage.setItem('wakeOption', wakeOption);
  }, [wakeOption]);

  return (
    <WakeContext.Provider value={{ wakeOption, setWakeOption }}>
      {children}
    </WakeContext.Provider>
  );
};
export default WakeContextProvider;
