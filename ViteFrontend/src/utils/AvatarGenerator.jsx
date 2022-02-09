// import react, {useEffect, useState} from "react";
import * as React from "react";
const randomColor1 =`#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
const randomColor =`#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
console.log("**", randomColor);

function AvatarGenerator(props) {
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{
        height: 50,
        width: 50,
      }}
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1={0} x2={1} y1={0} y2={1}>
          <stop offset="0%" stopColor={randomColor1} />
          <stop offset="100%" stopColor={randomColor} />
        </linearGradient>
      </defs>

      <path
        d="M256 23.05C127.5 23.05 23.05 127.5 23.05 256S127.5 488.9 256 488.9 488.9 384.5 488.9 256 384.5 23.05 256 23.05z" fill="url(#grad1)"
      />
      <g
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize={160}
        fontWeight="bold"
        textAnchor="middle"
        textDecoration="rgba(255, 255, 255, 1)"
      >
        <text
          stroke="rgba(0, 0, 0, 1)"
          strokeWidth={40}
          transform="translate(256 317)"
        >

        </text>
        <text fill="rgba(255, 255, 255, 1)" transform="translate(256 317)">
          <tspan x={0} y={0}>
            {props.text}
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export default AvatarGenerator;
