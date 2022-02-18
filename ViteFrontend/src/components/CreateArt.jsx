import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/authContext'
import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';
import { UploadIcon, DeleteIcon, SaveIcon, AvatarGenerator } from '../assets'

const CreateArt = () => {
  const { user } = useContext(AuthContext)
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = async (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity

    const imgTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/jpeg', 'image/gif', 'image/tiff'];

    // Validate file type with above imagesType array
    if (imgTypes.indexOf(selectedFile.type) !== -1) {
      try {
        setWrongImageType(false);
        setLoading(true);
        let document = await client.assets
          .upload('image', selectedFile,
            {
              contentType: selectedFile.type,
              filename: selectedFile.name
            });
        setImageAsset(document);
        setLoading(false);
      } catch (error) {
        console.error("error form uploading IMG", error);
        console.log('Upload failed:', error.message);
      }
    } else {
      setLoading(false);
      setWrongImageType(true);
      setTimeout(
        () => {
          setWrongImageType(false);
          console.log('setTimeout Fired');
        }, 2000
      );
    }
  }

  // ❗ ⇩ Need to add form validation for creatArt
  const saveArt = async () => {

    if (title && about && imageAsset?._id && category) {
      const doc = {
        _type: 'art',
        title,
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user.id,
        postedBy: {
          _type: 'postedBy',
          _ref: user.id,
        },
        category,
      };
      try {
        setLoading(true);
        await client.create(doc);
        navigate("/");
      } catch (error) {
        console.error
      }
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        }, 2000
      );
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="mt-5 p-5 leading-normal text-white bg-yellow-500 rounded-lg transition-all duration-150 ease-in "> ⇩ All fields are required.</p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-full">
            {loading && (
              <Spinner message={`Uploading...`} />
            )}
            {
              wrongImageType && (
                <div className="bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-4" role="alert">
                  <p className="font-bold">
                    File Error ‼
                  </p>
                  <p>
                    Wrong type of file or size is over 20MB !
                  </p>
                </div>
              )
            }
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <UploadIcon />
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Select photo/image that is less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                />
                <button
                  type="button"
                  className=" p-3 rounded-full bg-white text-sm cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <AvatarGenerator />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Art is about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Art Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={saveArt}
                className="bg-orange-500 text-white font-bold p-2 rounded-full outline-none"
              >
                <SaveIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArt;