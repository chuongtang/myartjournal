import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { userCreatedArtsQuery, userQuery, userSavedArtsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import { useContext } from 'react'
import AuthContext from '../../store/authContext'
import Loading from "../assets/Loading.svg";
import Spinner from './Spinner';

const activeBtnStyles = 'bg-yellow-600 text-white font-bold p-2 rounded-xl w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-indigo-900 font-bold p-2 rounded-xl w-20 outline-none';

const UserProfile = () => {
  const { user, login, logout, authReady } = useContext(AuthContext)
  const [appUser, setAppUser] = useState();
  const [sanUserID, setSanUserID] = useState();
  const [arts, setArts] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);

  // const {
  //   user,
  //   isAuthenticated,
  //   loginWithRedirect,
  //   logout,
  // } = useAuth0();

  const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    // const query = userQuery(userId);
    // client.fetch(query).then((data) => {
    // setAppUser(data[0]);
    const { sub } = user;
    // setSanUserID(sub.replace("|", "-"));
    setAppUser(user);
  },
    [user]);
  // }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdArtsQuery = userCreatedArtsQuery(userId);
      setLoading(true);
      client.fetch(createdArtsQuery).then((data) => {
        setArts(data);
        setLoading(false);
      });
    } else {
      const savedArtsQuery = userSavedArtsQuery(userId);

      client.fetch(savedArtsQuery).then((data) => {
        setArts(data);
      });
    }
  }, [text, userId]);

  if (!user) return <div>
    <object type="image/svg+xml" data={Loading} style={{ maxHeight: "9rem" }} alt="Animation Loading"></object>
    <p>Loading user profile</p>
  </div>;


  // if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            {/* <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            /> */}

            <img
              className="rounded-full w-18 h-18 mt-10 shadow-xl object-cover"
              src={user.picture} //⬅need to add random avarta API here
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-indigo-900 text-shadow-lg text-center mt-3">
            {user.full_name}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">

            <button type="button"
              className="inline-block px-6 py-2.5 mr-2 bg-yellow-200 font-semibold text-indigo-900 text-md leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg focus:bg-blue-700 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
              onClick={() => logout()} >
              LOG OUT
            </button>


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
            <Spinner message={`Loading ${user.full_name}'s  art works`} />
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