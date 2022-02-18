import React from "react";

function LikeIcon(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="3em"
    height="3em"
    viewBox="0 0 16 16"
    {...props}
  >
      <defs>
          <linearGradient x1={0} x2={1} y1={0} y2={1} id="a">
            <stop offset="0%" stopColor="#ed814f" />
            <stop offset="100%" stopColor="#0d20ba" />
          </linearGradient>
        </defs>
    <path
      fill="url(#a)"
      d="M9.58 1.052c-.75-.209-1.336.35-1.545.871-.24.6-.453 1.021-.706 1.524a44.75 44.75 0 0 0-.533 1.09c-.475 1.01-.948 1.656-1.293 2.045a4.063 4.063 0 0 1-.405.402 1.92 1.92 0 0 1-.101.081l-.016.012L3.109 8.18a2 2 0 0 0-.856 2.426l.52 1.384a2 2 0 0 0 1.273 1.205l5.356 1.682a2.5 2.5 0 0 0 3.148-1.68l1.364-4.647a2 2 0 0 0-1.92-2.563H10.61c.066-.227.133-.479.195-.74.131-.562.243-1.203.232-1.738-.009-.497-.06-1.019-.264-1.462-.219-.475-.602-.832-1.192-.996zM4.978 7.08l-.002.001z"
    />
  </svg>
  );
}

export default LikeIcon;
