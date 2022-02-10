import react, {useEffect, useState, useContext} from "react";
import AuthContext from '../../store/authContext';

// ⇩ Random colors for gradient svg background
const randomColor1 =`#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
const randomColor =`#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
console.log("**", randomColor);

function AvatarGenerator(props) {
  const { user, userImgUrl } = useContext(AuthContext);
  const avatarSize = props.size;
  console.log("**&&", avatarSize);
  return (

    userImgUrl ? <img
      className="rounded-full w-18 h-18 mt-10 shadow-xl object-cover -mt-12 border-transparent border-5"
      src={userImgUrl}
      alt="user-pic"
    /> :
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      preserveAspectRatio="xMinYMin meet"
      style={{
        height: avatarSize,
        width: avatarSize,
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
            {user.user_metadata.full_name.substring(0,2)}
          </tspan>
        </text>
      </g>
    </svg>
    
  );
}

export default AvatarGenerator;
