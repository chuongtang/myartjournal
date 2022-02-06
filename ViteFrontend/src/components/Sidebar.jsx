import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import RightArrow from '../assets/RightArrow';
import logo from '../assets/logo.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll hide-scrollbar ">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" style={{ maxWidth: "14rem" }} />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            {/* ⇩ Home svg icon */}
            <svg width="25pt" height="25pt" viewBox="0 0 752 752">
              <g fill="#f67f00">
                <path d="M376 479.6a51.799 51.799 0 0 0-51.797 51.797v66.598h103.6v-66.598a51.801 51.801 0 0 0-51.801-51.797z" />
                <path d="m376 305.85-189.73 81.398h-2.664v166.34a44.386 44.386 0 0 0 13.004 31.395 44.384 44.384 0 0 0 31.395 13.004h66.598v-66.598a81.398 81.398 0 0 1 122.094-70.492 81.405 81.405 0 0 1 40.699 70.492v66.598h66.598a44.4 44.4 0 0 0 44.399-44.399v-165.61a20.256 20.256 0 0 1-2.813-.887z" />
                <path d="m588.96 243.99-207.19-88.797a14.798 14.798 0 0 0-11.543 0l-207.19 88.797a14.79 14.79 0 0 0-6.562 5.45 14.77 14.77 0 0 0-2.465 8.163V346.4a14.794 14.794 0 0 0 6.66 12.285 14.802 14.802 0 0 0 13.91 1.332L376 273.737l201.42 86.28h.004a14.792 14.792 0 0 0 5.77 1.184 14.81 14.81 0 0 0 8.14-2.516 14.794 14.794 0 0 0 6.66-12.285v-88.797a14.803 14.803 0 0 0-9.027-13.613z" />
              </g>
            </svg>
            Home
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-red rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
          <p>{user.userName}</p>
          <RightArrow style={{ maxHeight: "1.75rem" }} />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;