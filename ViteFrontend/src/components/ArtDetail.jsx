import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { artDetailMoreArtQuery, artDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const ArtDetail = ({ user }) => {
  const { artId } = useParams();
  const [arts, setArts] = useState();
  const [artDetail, setArtDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchArtDetails = () => {
    const query = artDetailQuery(artId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setArtDetail(data[0]);
        console.log("Data ** ARTDETAIL ** from clientDotFetch", data[0].image.asset.url);
        if (data[0]) {
          const query1 = artDetailMoreArtQuery(data[0]);
          client.fetch(query1).then((res) => {
            setArts(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchArtDetails();
  }, [artId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(artId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchArtDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!artDetail) {
    return (
      <Spinner message="Loading art work..." />
    );
  }

  return (
    <>
      {artDetail && (
        <div className="flex  flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg max-h-xl"
              src={(artDetail?.image && artDetail.image.asset.url)}
              alt="user-post -workingHERE"
            />

          </div>
          <div className="w-full p-5 flex-1">
            <div className="float-right">
              <div className="flex gap-2 items-center">
                <a
                  href={`${artDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  {/* Dowload svg */}
                  <svg width="32pt" height="32pt" viewBox="0 0 752 752">
                    <g fill="#f67f00" fillRule="evenodd">
                      <path d="M580.86 388.05h-48.148c-7.066 0-12.801 5.734-12.801 12.801 0 7.063 5.734 12.797 12.801 12.797h35.352v167.01h-383.69v-167.01h35.352c7.066 0 12.801-5.734 12.801-12.797 0-7.066-5.734-12.801-12.801-12.801h-48.152c-7.063 0-12.797 5.734-12.797 12.801v192.61c0 7.078 5.734 12.801 12.797 12.801h409.29c7.066 0 12.801-5.723 12.801-12.801v-192.61c0-7.066-5.734-12.801-12.801-12.801" />
                      <path d="M330.34 323.36V184.17c0-6.223 5.055-11.277 11.277-11.277h69.219c6.223 0 11.277 5.055 11.277 11.277v139.19h77.309L379.732 459.7l-119.69-136.34zm30.73 153.88a24.886 24.886 0 0 0 18.664 8.45 24.86 24.86 0 0 0 18.66-8.45l121.38-138.25c6.527-7.422 8.04-17.637 3.969-26.637-4.07-8.996-12.75-14.59-22.63-14.59h-53.401v-113.59c0-20.34-16.547-36.875-36.875-36.875h-69.22c-20.34 0-36.874 16.535-36.874 36.875v113.59h-46.387c-9.88 0-18.547 5.594-22.63 14.59-4.07 9-2.546 19.215 3.97 26.637z" />
                    </g>
                  </svg>
                </a>
              </div>

            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {artDetail.title}
              </h1>
              <p className="mt-3">{artDetail.about}</p>
            </div>
            <Link to={`/user-profile/${artDetail?.postedBy._id}`} className="inline-flex gap-2 mt-5 items-center bg-white rounded-lg ">
              Posted by:<img src={artDetail?.postedBy.image} 
              className="w-10 h-10 rounded-full" 
              alt="user-profile" />
              <p className="font-bold"> {artDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {artDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <textarea
                className="flex border-gray-100 outline-none border-2 p-2 rounded-lg w-11/12 xl:w-1/2 md:w-11/12 focus:border-gray-300"
                type="text"
                rows="1"
                cols="90"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-yellow-500 text-white rounded-xl px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
      {arts?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {arts ? (
        <MasonryLayout arts={arts} />
      ) : (
        <Spinner message="Loading more..." />
      )}
    </>
  );
};

export default ArtDetail;