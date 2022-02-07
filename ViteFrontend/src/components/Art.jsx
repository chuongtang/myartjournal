import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import DeleleteIcon from '../assets/DeleleteIcon'
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { client, urlFor } from '../client';
import Loading from '../assets/Loading.svg'

const Art = ({ art }) => {

  const { user } = useContext(AuthContext);
  // const { sub, name, picture } = user
  // const sanityUserId = sub.replace("|", "-")
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id, _ref } = art;

  // const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deleteArt = (id) => {
    setIsLoading(true)
    client
      .delete(id)
      .then(() => {
        setIsLoading(false)
        window.location.reload();
      });
  };

  let alreadySaved = art?.save?.filter((item) => item?.postedBy?._ref === sub.replace("|", "-"));

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const saveArt = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
      // ⇩ Update doc in sanaity database 
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.user._id,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.user._id,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          console.log('art saved successfully')
          setSavingPost(false);
        });
    }
  };

  useEffect(() => {
    console.log('PostedBy.ID', postedBy._id);
    console.log('User from sanityUserId', sanityUserId)
  })

  return (
 
    <div className="m-2">
      {isLoading &&<object type="image/svg+xml" data={Loading} style={{maxHeight:"9rem"}} alt="Animation Loading"></object>}
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/art-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />
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
                ><MdDownloadForOffline />
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
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {art?.save?.length}   {savingPost ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">

              {
                postedBy?._id === sanityUserId && (

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