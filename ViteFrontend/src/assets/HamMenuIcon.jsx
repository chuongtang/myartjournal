import React from "react";

function HamMenuIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{
        height: 20,
        width: 20,
      }}
      {...props}
    >
      <defs>
        <linearGradient id="a">
          <stop offset="0%" stopColor="#e61523" stopOpacity={0.51} />
          <stop offset="100%" stopColor="#054634" />
        </linearGradient>
      </defs>
      <path
        d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"
        fill="url(#a)"
      />
    </svg>
  );
}

export default HamMenuIcon;