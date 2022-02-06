import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [arts, setArts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setArts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setArts(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Searching artworks" />}
      {arts?.length !== 0 && <MasonryLayout arts={arts} />}
      {arts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No arts Found!</div>
      )}
    </div>
  );
};

export default Search;