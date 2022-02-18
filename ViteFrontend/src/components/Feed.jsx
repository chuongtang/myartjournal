import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/authContext';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [arts, setArts] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const {triggerRender} = useContext(AuthContext);

  useEffect(async () => {
   
    if (triggerRender && !categoryId) {
      try {
        setLoading(true);
        console.log("else section in feed's useEffect fired");
        const data = await client.fetch(feedQuery);
        console.log("DATA from fetch", data);
        setArts(data);
        console.log("DATA AFTER  setState from fetch", data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      };
    } else {
      try {
        setLoading(true);
        const query = searchQuery(categoryId);
        const data = await client.fetch(query);
        setArts(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
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