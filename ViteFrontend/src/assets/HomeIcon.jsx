import React from "react";

function HomeIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{
        height: 30,
        width: 30,
      }}
      {...props}
    >
      <defs>
        <linearGradient x1={0} x2={0} y1={0} y2={1} id="a">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#aef1ce" />
        </linearGradient>
      </defs>
      <rect
        fill="url(#a)"
        stroke="#fff"
        strokeWidth={9}
        height={494}
        width={494}
        rx={32}
        ry={32}
      />
      <path
        d="M256 19.27 25.637 249.638 19.27 256 32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73 492.73 256l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z"
        fill="#fff"
      />
    </svg>
  );
}

export default HomeIcon;
