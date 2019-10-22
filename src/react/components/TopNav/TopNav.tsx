import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Logo } from '../Logo/Logo';
import {
  useLocalStorage,
  usePrevious
} from '../../hooks';

const styles = require('./TopNav.scss');

export function TopNav(props: any) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState(null);
  const [abortController, setAbortController] = useState();

  const localStorage = useLocalStorage();
  const [activeTheme, setActiveTheme] = useState(localStorage.get('theme')||'light');
  const previousTheme = usePrevious(activeTheme);

  useEffect(() => {
    if (query) {
      if (abortController) {
        abortController.abort();
      }

      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      fetch(`/search/${query}`, {signal: newAbortController.signal})
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((err) => {
  
        }).finally(() => {

        });
    } else {
      setLocation(null);
      setSearchResults([]);
    }
  }, [query]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  useEffect(() => {
    if (previousTheme !== activeTheme) {
      document.body.classList.remove(`theme-${previousTheme}`);
    }
    document.body.classList.add(`theme-${activeTheme}`);

    localStorage.set('theme', activeTheme);
  }, [activeTheme])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Logo color={activeTheme === 'light' ? 'colorized' : 'normal'} />
          <p className={styles.title}>SunnySide</p>
        </div>
        <div className={styles.searchContainer}>
          <input className={styles.search} type='text' onChange={(event) => setQuery(event.target.value)}></input>
          <i className={['fas fa-search', styles.icon].join(' ')} />
        </div>
        <div className={styles.themeContainer} onClick={
          () => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light')
        }>
          <i className={['fas', activeTheme === 'light' ? 'fa-sun' : 'fa-moon', styles.icon].join(' ')} />
          <p className={styles.title}>{activeTheme} theme</p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<TopNav />, document.getElementById('topnav'));