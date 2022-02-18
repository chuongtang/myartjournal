import React, { useEffect, useState } from 'react';
import { useContext } from 'react'
import AppContext from '../../store/AppContext'
import TextTransition, { presets } from "react-text-transition";
import ParticleBG from './ParticleBG';
import { AppLogo, LoginIcon } from '../assets'

const TEXTS = [
  "capture our visual journal",
  "record our digital art",
  "share some imagination",
  "make great memorie"
];


const AuthUser = () => {

  const { user, login } = useContext(AppContext)

  // Title animation config START
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000
    );

    return () => clearInterval(intervalId);
  }, []);
  // Title animation config END

  return (

    <div className="flex justify-start items-center flex-col h-screen ">
      {/*⇩ kids would love to play with this colorful thingy! */}
      <ParticleBG />
      <div className="relative w-full h-full ">
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <AppLogo size={250} />
          </div>
          <section className='mx-4 md:text-3xl lg:text-5xl font-600 text-shadow-sm  text-stroke-sm mb-8 flex'>
            <div style={{ color: "#E9E1B6" }}>Let's...</div>
            <TextTransition
              text={TEXTS[index % TEXTS.length]}
              springConfig={presets.wobbly}
              className='text-yellow-500 '
            /><span className='text-red-500'>s</span>
          </section>
          <div className="shadow-2xl ">
            <button type="button" className="py-2 px-4  bg-gray-500/50 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={login}>
              LOGIN
              <LoginIcon />
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