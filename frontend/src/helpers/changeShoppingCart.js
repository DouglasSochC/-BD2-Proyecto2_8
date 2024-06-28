'use client'

import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [actualizarShoppingCart, setActualizarShoppingCart] = useState(0);

  return (
    <MyContext.Provider value={{ actualizarShoppingCart, setActualizarShoppingCart }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };