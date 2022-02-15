import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { userCreatedArtsQuery, userQuery, userSavedArtsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import { useContext } from 'react'
import AuthContext from '../../store/authContext'
import {Loading, ExitIcon, AvatarGenerator} from "../assets";
import Spinner from './Spinner';


const activeBtnStyles = 'bg-yellow-600 text-white font-bold p-2 rounded-xl w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-indigo-900 font-bold p-2 rounded-xl w-20 outline-none';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext)
  const [arts, setArts] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);


  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(async () => {
    try {
      if (text === 'Created') {
        const createdArtsQuery = userCreatedArtsQuery(userId);
        setLoading(true);
        let data = await client.fetch(createdArtsQuery);
        setArts(data);
        setLoading(false);
      } else {
        const savedArtsQuery = userSavedArtsQuery(userId);
        let data = await client.fetch(savedArtsQuery);
        setArts(data);
      }
    } catch (error) {
      console.error(error)
    }

  }, [text, userId]);

  if (!user) return <div>
    <object type="image/svg+xml" data={Loading} style={{ maxHeight: "9rem" }} alt="Animation Loading"></object>
    <p>Loading user profile</p>
  </div>;


  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-40 2xl:h-70 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?textures-patterns,art"
              alt="user-pic"
            />
            <AvatarGenerator />
          </div>
          <h1 className="font-bold text-3xl text-indigo-900 text-shadow-lg text-center mt-3">
            {user.user_metadata.full_name}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            <ExitIcon onClick={() => {
              logout()
              navigate('/')
            }} className="px-1 py-1 border border-yellow-500 hover:cursor-pointer hover:bg-yellow-500 rounded-xl float-right" />
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>
        <div className="px-2">
          {loading && (
            <Spinner message={`Loading ${user.user_metadata.full_name}'s  art works`} />
          )}
          <MasonryLayout arts={arts} />
        </div>

        {arts?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            Nothing to show..yet !
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;