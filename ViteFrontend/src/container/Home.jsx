import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../store/authContext'
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Arts from './Arts';
import AppLogo from '../assets/AppLogo'


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [appUser, setAppUser] = useState();
  const scrollRef = useRef(null);
  const { user, login, logout, authReady, userImgUrl } = useContext(AuthContext)
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    console.log("User from context", user)

    if (user) {

      // ⇩ create this obj to store in Sanity
      const newUserInfo = {
        _id: user.id,
        _type: 'user',
        userName: user.user_metadata.full_name,
        image: userImgUrl,
      };
      console.log(`newUserInfo`, JSON.stringify(newUserInfo));
      client.createIfNotExists(newUserInfo).then(() => {
        console.log('newUser added into Sanity');
      });
      setAppUser(newUserInfo);
    };
  }, [user]);


  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });



  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen" >
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          {/* <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} /> */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{
              height: 50,
              width: 50,
            }}
            
          >
            <defs>
              <linearGradient id="a">
                <stop offset="0%" stopColor="#e61523" stopOpacity={0.51} />
                <stop offset="100%" stopColor="#054634" />
              </linearGradient>
            </defs>
            <path
              d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"
              fill="url(#a)"
            />
          </svg>

          {/* ⇩ Resposive logo & userprofile for small devide */}
          <Link to="/">
            <AppLogo />
          </Link>
          <Link to={`user-profile/${user?.id}`}>
            <img src={appUser?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}

      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>

        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Arts user={user && user} />} />
        </Routes>
      </div>



    </div>
  );
};

export default Home;
