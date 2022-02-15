import React from "react";

const DeleteIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{
        height: 40,
        width: 40,
      }}
      {...props}
    >
      <title id="Delete Button">Delete</title>
      <defs>
        <linearGradient x1={0} x2={0} y1={0} y2={1} id="a">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#aef1ce" />
        </linearGradient>
      </defs>
      <circle
        cx={256}
        cy={256}
        r={247}
        fill="url(#a)"
        stroke="#fff"
        strokeWidth={9}
      />
      <path d="M199 58v50h-78v30h270v-30h-78V58H199zm18 18h78v32h-78V76zm-79.002 80 30.106 286h175.794l30.104-286H137.998zm62.338 13.38.64 8.98 16 224 .643 8.976-17.956 1.283-.64-8.98-16-224-.643-8.976 17.956-1.283zm111.328 0 17.955 1.284-.643 8.977-16 224-.64 8.98-17.956-1.284.643-8.977 16-224 .64-8.98zM247 170h18v242h-18V170z" />
    </svg>
  );
}

export default DeleteIcon;
