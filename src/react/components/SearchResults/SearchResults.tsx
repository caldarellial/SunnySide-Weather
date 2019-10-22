import React, { useState, useEffect } from 'react';

import {
  useLocationName
} from '../../hooks';

const styles = require('./SearchResults.scss');

interface SearchResultsProps {
  results: any[];
}

export function SearchResults(props: SearchResultsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {(props.results||[]).map((result) => 
          <SearchResult result={result} />
        )}
      </div>
    </div>
  );
}

interface SearchResultProps {
  result: any;
}

function SearchResult(props: SearchResultProps) {
  const [placeId, setPlaceId] = useState(null);
  const label = useLocationName(props.result);

  useEffect(() => {
    setPlaceId(props.result.place_id);
  }, [props.result]);

  return (
    <a className={styles.result} href={`/location/${placeId}`}>
      {label}
    </a>
  );
}

export default SearchResults;