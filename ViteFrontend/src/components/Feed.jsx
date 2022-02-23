import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../store/AppContext';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { allArtsQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [arts, setArts] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const { triggerRender } = useContext(AppContext);
  const categoryQuery = searchQuery(categoryId);

  const fetchArts = async (queryName) => {
    setLoading(true);
    const data = await client.fetch(queryName);
    setArts(data);
    setLoading(false);
  }

  // Memory leaks!! ⬇ cost me full day to debug 😪 and I found the fix here: ➡ https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
  useEffect(async () => {
    let cancelAsync = false;
    
    if (cancelAsync) return;
    (!categoryId) ? fetchArts(allArtsQuery) : fetchArts(categoryQuery)

    return () => { 
      cancelAsync = true;
    }

  }, [categoryId, triggerRender]);

  if (loading) {
    return (
      <Spinner message={`...loading art works`} />
    );
  }
  return (
    <div>
      {arts && (
        <MasonryLayout arts={arts} />
      )}
    </div>
  );

};

export default Feed;