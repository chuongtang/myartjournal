import * as React from "react";

function ExitIcon(props) {
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
      <linearGradient x1={0} x2={0} y1={0} y2={1} id="a">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#aef1ce" />
      </linearGradient>
      <linearGradient id="b">
        <stop offset="0%" stopColor="#252422" />
        <stop offset="100%" stopColor="#fffcf2" />
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
      d="M217 28.098v455.804l142-42.597V70.697zm159.938 26.88.062 2.327V87h16V55zM119 55v117.27h18V73h62V55zm258 50v16h16v-16zm0 34v236h16V139zm-240 58.727V233H41v46h96v35.273L195.273 256zM244 232c6.627 0 12 10.745 12 24s-5.373 24-12 24-12-10.745-12-24 5.373-24 12-24zM137 339.73h-18V448h18zM377 393v14h16v-14zm0 32v23h16v-23zM32 471v18h167v-18zm290.652 0-60 18H480v-18z"
      fill="url(#b)"
      transform="matrix(.6 0 0 .6 102.4 -12.6)"
    />
    <g
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize={127}
      fontWeight="bold"
      textAnchor="middle"
      textDecoration="rgba(129, 178, 154, 1)"
    >
      <text
        stroke="rgba(242, 204, 143, 1)"
        strokeWidth={31.75}
        transform="translate(243 417)"
      >
        <tspan x={0} y={0}>
          {"Log out"}
        </tspan>
      </text>
      <text fill="rgba(129, 178, 154, 1)" transform="translate(243 417)">
        <tspan x={0} y={0}>
          {"Log out"}
        </tspan>
      </text>
    </g>
  </svg>
  );
}

export default ExitIcon;
