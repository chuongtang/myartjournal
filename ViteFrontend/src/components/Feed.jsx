import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../store/AppContext';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [arts, setArts] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const { triggerRender } = useContext(AppContext);
  const categoryQuery = searchQuery(categoryId);

  const fetchArts = async(queryName)=>{
    setLoading(true);
    const data = await client.fetch(queryName);
    setArts(data);
    setLoading(false);
  }

  useEffect(async () => {
    (triggerRender && !categoryId) ? fetchArts(feedQuery) : fetchArts(categoryQuery)
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