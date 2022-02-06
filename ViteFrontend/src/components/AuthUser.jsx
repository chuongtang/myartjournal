import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { useContext } from 'react'
import AuthContext from '../../store/authContext'
// import TextTransition, { presets } from "react-text-transition";
// import ParticleBG from './ParticleBG'

// const TEXTS = [
//   "capture our visual journal",
//   "record our digital art",
//   "share some imagination",
//   "make great memorie"
// ];


const AuthUser = () => {

  const { user, login, logout, authReady } = useContext(AuthContext)
  console.log(user)

  // Title animation config START
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000
    );
    return () => clearTimeout(intervalId);
  }, []);
  // Title animation config END


  return (

      <div className="flex justify-start items-center flex-col h-screen ">
        {/* <ParticleBG /> */}

        <div className="relative w-full h-full ">
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="250rem" />
            </div>
            {/* <section className='mx-4 md:text-3xl lg:text-5xl font-600 text-shadow-sm  text-stroke-sm mb-8 flex'>
              <div style={{ color: "#E9E1B6" }}>Let's...</div>

              <TextTransition
                text={TEXTS[index % TEXTS.length]}
                springConfig={presets.wobbly}
                className='text-yellow-500 '
              /><span className='text-red-500'>s</span>
            </section> */}
            <div className="shadow-2xl ">

              <button type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={login}>
                LOGIN or SIGNUP
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 752 752"><path d="M376 0c-49.375 0-98.27 9.727-143.89 28.621a375.85 375.85 0 0 0-121.98 81.508 375.934 375.934 0 0 0-81.508 121.98 375.99 375.99 0 0 0 81.509 409.76 375.994 375.994 0 0 0 531.74 0 376.004 376.004 0 0 0 .01-531.74A376 376 0 0 0 376.001-.001zm0 42.465c43.316 0 86.207 8.625 126.23 25.387 40.02 16.762 76.379 41.332 107.01 72.305s54.926 67.738 71.5 108.21c16.578 40.465 25.105 83.84 25.105 127.64 0 88.461-34.75 173.3-96.605 235.84-61.859 62.551-145.75 97.691-233.23 97.691a326.635 326.635 0 0 1-126.22-25.387c-40.02-16.762-76.383-41.332-107.01-72.301-30.629-30.973-54.926-67.742-71.504-108.21C54.702 463.171 46.171 419.8 46.171 376s8.531-87.172 25.105-127.64c16.578-40.469 40.871-77.238 71.5-108.21 30.629-30.969 66.992-55.539 107.01-72.301a326.696 326.696 0 0 1 126.23-25.387z" fill="#fff" /><path d="M375.95 154.07c-13.57 0-25.566 5.594-33.215 14.195-7.644 8.602-11.129 19.457-11.129 30.148 0 10.688 3.484 21.543 11.129 30.145 7.648 8.605 19.645 14.223 33.215 14.223 74.156 0 133.28 59.121 133.28 133.28s-59.109 133.17-133.28 133.17c-13.57 0-25.566 5.59-33.215 14.191-7.644 8.602-11.129 19.484-11.129 30.176s3.484 21.547 11.129 30.148c7.648 8.602 19.645 14.191 33.215 14.191 122.12 0 221.99-99.738 221.99-221.88 0-122.14-99.855-221.99-221.99-221.99zm-91.227 88.828c-23.41 1.297-41.941 20.918-41.941 44.34v14.855h-44.34c-24.348 0-44.371 20.023-44.371 44.371v59.082c0 24.348 20.023 44.367 44.371 44.367h44.34v14.859c0 35.688 42.555 56.91 71.105 35.496l118.43-88.828c23.344-17.508 23.344-53.395 0-70.902l-118.43-88.797c-8.36-6.266-18.699-9.426-29.164-8.844z" fill="#fff" /></svg>
              </button>
            </div>
            <div className="shadow-2xl">

            </div>
          </div>
        </div>
      </div>
  );
};

export default AuthUser;