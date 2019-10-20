import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import zipcodes from 'zipcodes';

const styles = require('./TopNav.scss');

export function TopNav(props: any) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const locationResult = zipcodes.lookup(query);

    if (locationResult) {
      setLocation(location);
      fetch(`search/${query}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((err) => {

        }).finally(() => {

        });
    } else {
      setLocation(null);
    }
  }, [query]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.search}>
          <input type='number' onChange={(event) => setQuery(event.target.value)}></input>
        </div>
        <div className={styles.result}>

        </div>
        <div className={styles.theme}>

        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<TopNav />, document.getElementById('topnav'));