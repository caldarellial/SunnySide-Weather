import { useState, useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

export function useActiveTheme() {
  const localStorage = useLocalStorage();
  const storedTheme = localStorage.get('theme');
  const [activeTheme, setActiveTheme] = useState(localStorage.get('theme')||'light');

  useEffect(() => {
    if (storedTheme !== activeTheme) {
      setActiveTheme(storedTheme);
    }
  }, [storedTheme]);

  return activeTheme;
}

export default useActiveTheme;