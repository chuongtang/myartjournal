import React, { useState, useRef, useEffect } from 'react';

import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
// import { Sidebar, UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Art from './Arts';
import logo from '../assets/logo.png';


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [appUser, setAppUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  // const { sub, name, picture } = user;


  useEffect(() => {
    if (isAuthenticated) {
      console.log(`User`, JSON.stringify(user));
      const { sub, name, picture } = user

      // ⇩ create this obj to store in Sanity
      const newUserInfo = {
        _id: sub.replace("|", "-"),
        _type: 'user',
        userName: name,
        image: picture,
      };
      console.log(`newUserInfo`, JSON.stringify(newUserInfo));
      client.createIfNotExists(newUserInfo).then(() => {
        console.log('newUser added into Sanity');
      });
      setAppUser(newUserInfo);
    };
  }, [isAuthenticated]);


  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });



  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <p>HOME COMPONENT HERE</p>
      <div className="hidden md:flex h-screen" >
      {/* <div className="hidden md:flex h-screen" style={{marginRight:"-448px"}}> */}
        <Sidebar user={appUser && appUser} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-20" />
          </Link>
          <Link to={`user-profile/${appUser?._id}`}>
            <img src={appUser?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={appUser && appUser} />
          </div>
        )}

      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
     
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Arts user={appUser && appUser} />} />
        </Routes>
      </div>



    </div>
  );
};

export default Home;
