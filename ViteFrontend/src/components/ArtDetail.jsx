import React, { useEffect, useState } from 'react';
import {DownloadIcon, AvatarGenerator} from '../assets';
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

  // callback to be invoked in below try-catch
  const setArtWithQuery = async (queries) => {
    const artQuery = artDetailMoreArtQuery(queries);
    try {
      let result = await client.fetch(artQuery);
      setArts(result);
    } catch (error) {
      console.log("error in etArtWithQuery", error);
    }
  };

  const fetchArtDetails =async () => {
    const query = artDetailQuery(artId);

    if (query) {

      try {
        let data = await client.fetch(`${query}`);
        setArtDetail(data[0]); 
        
        if (data[0]) {
          setArtWithQuery(data[0]);
        }
      } catch (error) {
        console.log("error fetchingQUERY", error);
      }
    }
  };

  useEffect(() => {
    fetchArtDetails();
  }, [artId]);

  const addComment = async () => {
    if (comment) {
      try {
        setAddingComment(true);
        await client
          .patch(artId)
          .setIfMissing({ comments: [] })
          .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user.id } }])
          .commit();
        fetchArtDetails();
        setComment('');
        setAddingComment(false);
      } catch (error) {
        console.log("error addComment", error);
      }
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
                <DownloadIcon />
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
              alt="user-profile-POSTEDBY" />
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
              <AvatarGenerator />
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