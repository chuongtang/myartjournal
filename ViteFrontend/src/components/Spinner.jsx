import React from 'react';

import SpinningIcon from "../assets/SpinningIcon.svg"

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <object type="image/svg+xml" data={SpinningIcon} style={{maxHeight: "5rem"}} alt="Animation Top Logo"></object>
      <p className="text-md text-center text-pink-500 px-2">{message}</p>
    </div>
  );
}

export default Spinner;