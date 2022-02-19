import React, { useState, useContext } from 'react';
import AppContext from '../../store/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import { DeleteIcon, Loading, DownloadIcon, LikeIcon } from '../assets'

const Art = ({ art }) => {

  const { user, newRender } = useContext(AppContext);
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id, } = art;

  const deleteArt = async (id) => {
    try {
      setIsLoading(true)
      await client.delete(id);
      setIsLoading(false);
      console.log(newRender);
      newRender();
    } catch (error) {
      console.log(error)
    }
  };

  let alreadyLiked = art?.save?.filter(item => item?.postedBy?._id === user.id);
  // console.log("%cART.save array", "color: red",art.save )
  // console.log("%cuser.id", "color: green",user.id )
  // console.log("%calreadyLikedDATA", "color: blue",alreadyLiked )
  alreadyLiked = alreadyLiked?.length > 0 ? alreadyLiked : [];
  // console.log("%calreadyLikedAFTER filter", "color: pink",alreadyLiked )
  const saveArt = async (id) => {
    if (alreadyLiked?.length === 0) {
      console.log("%calreadyLikedDATA", "color: red",alreadyLiked )
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
        setSavingPost(false);
        console.log("%cart saved successfully", "color: green");
        // console.log('art saved successfully')
        // newRender();
        
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
        {!isLoading && <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />}
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
              {alreadyLiked?.length !== 0 ? (
                <button type="button" className="bg-red-500 opacity-50 hover:opacity-100 text-white font-bold p-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {/* ❗ ⇩ Need to setState here instead of reload */}
                  {art?.save?.length}  {art?.save?.length > 1 ? "Likes" : "Like"}
                </button>
              ) : (
                <div className="flex pl-1 text-white text-md items-center bg-gray-500 rounded-full ">
                {art?.save?.length} 
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveArt(_id);
                  }}
                  type="button"
                  className="w-auto h-auto p-2 flex items-center opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                    {savingPost ? 'Saving...' : <LikeIcon />}
                </button>
                </div>
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
                    <DeleteIcon />
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
    </div>
  );
};

export default Art;