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

  useEffect(async () => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      await client.fetch(query).then((data) => {
        setArts(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      console.log("else section in feed's useEffect fired")
      await client.fetch(feedQuery).then((data) => {
        console.log("DATA from fetch", data)
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