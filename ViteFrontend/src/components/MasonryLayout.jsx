import React from 'react';
import Masonry from 'react-masonry-css';
import Art from './Art';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ arts }) => (
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {arts?.map((art) => <Art key={art._id} art={art} className="w-max" />)}
  </Masonry>
);

export default MasonryLayout;