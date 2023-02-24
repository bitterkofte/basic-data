import { createContext, useState } from "react";

export const ColorContext = createContext({
  color: '#ff9797',
  setColor: (colors) => {},
});

function ColorContextProvider({children}) {
  const [newColor, setNewColor] = useState('');

  function setColor(colors){
    setNewColor(colors);
  }

  const value = {
    color: newColor,
    setColor: setColor,
  };

  return(
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  )
}

export default ColorContextProvider;