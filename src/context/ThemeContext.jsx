import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 
  const [theme, setTheme] = useState('light');

  useEffect(() => {
   
    document.documentElement.classList.remove('dark-mode');
  }, [theme]);

  const toggleTheme = () => {
    
    console.log('Modo escuro desativado temporariamente');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);