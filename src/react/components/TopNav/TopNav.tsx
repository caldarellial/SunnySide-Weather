import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Logo } from '../Logo/Logo';
import {
  useLocalStorage,
  usePrevious
} from '../../hooks';
import SearchResults from '../SearchResults/SearchResults';

const styles = require('./TopNav.scss');

export function TopNav(props: any) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState(null);
  const [abortController, setAbortController] = useState();
  const searchInput: any = useRef(null);

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
          setSearchResults(data.results);
        })
        .catch(() => {
          setSearchResults([]);
        });
    } else {
      setLocation(null);
      setSearchResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (previousTheme !== activeTheme) {
      document.body.classList.remove(`theme-${previousTheme}`);
    }
    document.body.classList.add(`theme-${activeTheme}`);

    localStorage.set('theme', activeTheme);
  }, [activeTheme])

  function cancelSearchResults() {
    setSearchResults([]);
    if (searchInput && searchInput.current) {
      searchInput.current!.value('');
    }
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.content}>
          <a className={styles.logoContainer} href='/'>
            <Logo color={activeTheme === 'light' ? 'colorized' : 'normal'} />
            <p className={styles.title}>SunnySide</p>
          </a>
          <div className={styles.searchContainer}>
            <input
              className={styles.search}
              type='text'
              ref={searchInput}
              onChange={(event) => setQuery(event.target.value)}
            />
            {searchResults.length == 0 && <i className={['fas fa-search', styles.icon].join(' ')} />}
            {
              searchResults.length > 0 &&
              <i
                className={['fas fa-times', styles.icon].join(' ')}
                onClick={() => cancelSearchResults()} 
              />
            }
          </div>
          <div className={styles.themeContainer} onClick={
            () => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light')
          }>
            <i className={['fas', activeTheme === 'light' ? 'fa-sun' : 'fa-moon', styles.icon].join(' ')} />
            <p className={styles.title}>{activeTheme} theme</p>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && <SearchResults results={searchResults} />}
    </React.Fragment>
  )
}

ReactDOM.render(<TopNav />, document.getElementById('topnav'));