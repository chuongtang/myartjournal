import * as React from "react";

const RightArrow = (props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      height: 484,
      width: 484,
    }}
    {...props}
  >
    <defs>
      <linearGradient id="a">
        <stop offset="0%" stopColor="#f8e71c" />
        <stop offset="100%" stopColor="#1b5de1" />
      </linearGradient>
    </defs>
    <path
      d="M106.854 106.002a26.003 26.003 0 0 0-25.64 29.326c16 124 16 117.344 0 241.344a26.003 26.003 0 0 0 35.776 27.332l298-124a26.003 26.003 0 0 0 0-48.008l-298-124a26.003 26.003 0 0 0-10.136-1.994z"
      fill="url(#a)"
      transform="translate(0 -20)"
    />
  </svg>
  );
}

export default RightArrow;
