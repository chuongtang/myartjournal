import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import DeleleteIcon from '../assets/DeleleteIcon'
import { client, urlFor } from '../client';
import Loading from '../assets/Loading.svg';
import DownloadIcon from '../assets/DownloadIcon';
import LikeIcon from '../assets/LikeIcon';

const Art = ({ art }) => {

  const { user } = useContext(AuthContext);
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id, _ref } = art;
  // console.log('pppp', postedBy)
  const deleteArt = async (id) => {
    try {
      setIsLoading(true)
      await client.delete(id);
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };

  let alreadySaved = art?.save?.filter((item) => item?.postedBy?._ref === user?.id);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const saveArt = async (id) => {
    if (alreadySaved?.length === 0) {
      try {
        setSavingPost(true);
        await  // ⇩ Update doc in sanaity database 
          client
            .patch(id)
            .setIfMissing({ save: [] })
            .insert('after', 'save[-1]', [{
              _key: uuidv4(),
              userId: user?.id,
              postedBy: {
                _type: 'postedBy',
                _ref: user?.id,
              },
            }])
            .commit();
        window.location.reload();
        console.log('art saved successfully')
        setSavingPost(false);

      } catch (error) {
        console.log(error);
      }
    }
  };


  return (

    <div className="m-2">
      {isLoading && <object type="image/svg+xml" data={Loading} style={{ maxHeight: "9rem" }} alt="Animation Loading"></object>}
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/art-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {!isLoading &&<img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><DownloadIcon />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {/* ❗ ⇩ Need to setState here instead of reload */}
                  {art?.save?.length}  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveArt(_id);
                  }}
                  type="button"
                  className="bg-gray-500/50 opacity-70 hover:opacity-100 text-white font-bold px-1 py-1 text-base hover:shadow-md rounded-1/2 outline-none"
                >
                  {art?.save?.length}   {savingPost ? 'Saving...' : <LikeIcon />}
                  {/* {art?.save?.length}   {savingPost ? 'Saving...' : 'Save'} */}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">

              {
                postedBy?._id === user.id && (

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteArt(_id);
                    }}
                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  >
                    <DeleleteIcon />
                  </button>

                )
              }
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
      {/* <img src={urlFor(image).width(250).url()}/> */}
    </div>
  );
};

export default Art;