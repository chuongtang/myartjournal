import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [arts, setArts] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setArts(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setArts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  
  // const ideaName = categoryId || 'new';
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