import React, { useState, useRef, useEffect, useContext } from 'react';
import AppContext from '../../store/AppContext'
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
import Arts from './Arts';
import { AppLogo, AvatarGenerator, HamMenuIcon, CloseMenuIcon } from '../assets';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);
  const { user, userImgUrl } = useContext(AppContext)

  useEffect(async () => {


    if (user) {
      // ⇩ create this obj to store in Sanity
      const newUserInfo = {
        _id: user.id,
        _type: 'user',
        userName: user.user_metadata.full_name,
        image: userImgUrl,
      };

      try {
        await client.createIfNotExists(newUserInfo);
        
      } catch (error) {
        console.log('error creating NewUSer', error)
      }
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

      {/* ⇩  Resposive switch from sidebar to Hamburger Menu in Navbar*/}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
          <HamMenuIcon className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <AppLogo size={50} />
          </Link>

          <Link to={`user-profile/${user?.id}`} className="border border-gray-500 rounded-full">
            <AvatarGenerator />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <CloseMenuIcon className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      {/* End of Responsive switch */}

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
