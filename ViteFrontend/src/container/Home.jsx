import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../store/authContext'
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Arts from './Arts';
import logo from '../assets/logo.png';


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [appUser, setAppUser] = useState();
  const scrollRef = useRef(null);
  const { user, login, logout, authReady, userImgUrl } = useContext(AuthContext)
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    console.log("User from context", user)

    if (user) {
    //   console.log(`User`, JSON.stringify(user));
    //   const { sub, name, picture } = user
      // const imgUrl = `https://ui-avatars.com/api/?background=random&name=${user.user_metadata.full_name}&rounded=true&length=2`
      // ⇩ create this obj to store in Sanity
      const newUserInfo = {
        _id: user.id,
        _type: 'user',
        userName: user.user_metadata.full_name,
        image: userImgUrl ,
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
        <Sidebar user={appUser && appUser} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="h-8" />
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
          <Route path="/*" element={<Arts user={appUser && appUser} />} />
        </Routes>
      </div>



    </div>
  );
};

export default Home;
