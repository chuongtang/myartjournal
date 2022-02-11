import React from "react";

function DownloadIcon(props) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{
          height: 50,
          width: 50,
        }}
        {...props}
      >
        <title id="Download Button">Click to download</title>
        <defs>
          <linearGradient x1={0} x2={1} y1={0} y2={1} id="a">
            <stop offset="0%" stopColor="#ed814f" />
            <stop offset="100%" stopColor="#0d20ba" />
          </linearGradient>
        </defs>
        <path
          d="M200.1 31.2A130.1 132.4 0 0 0 70.03 163.6a130.1 132.4 0 0 0 .55 11.3 80.98 73.47 0 0 0-52.21 68.6A80.98 73.47 0 0 0 99.35 317a80.98 73.47 0 0 0 37.25-8.3 189.3 80.97 0 0 0 78.4 16.5v-49.9h82v50.1a189.3 80.97 0 0 0 39.5-5.7 91.09 67.8 0 0 0 66 21.1 91.09 67.8 0 0 0 91.1-67.8 91.09 67.8 0 0 0-58-63.1 70.1 81.72 20.61 0 0 2.6-6.2 70.1 81.72 20.61 0 0-36.8-101.2 70.1 81.72 20.61 0 0-76.9 22.8 130.1 132.4 0 0 0-124.4-94.1zM233 293.3v112h-51.3l74.3 74.3 74.3-74.3H279v-112h-46z"
          fill="url(#a)"
        />

      </svg>
    </>
  );
}

export default DownloadIcon;
