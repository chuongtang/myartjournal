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
      try {
        setLoading(true);
        const query = searchQuery(categoryId);
        const data = await client.fetch(query);
        setArts(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        setLoading(true);
        console.log("else section in feed's useEffect fired");
        const data = await client.fetch(feedQuery);
        console.log("DATA from fetch", data);
        setArts(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      };
    }
  }, [categoryId]);

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