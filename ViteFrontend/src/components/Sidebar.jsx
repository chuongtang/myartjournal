import React,{ useContext } from 'react';
import AuthContext from '../../store/authContext'
import { NavLink, Link } from 'react-router-dom';
import RightArrow from '../assets/RightArrow';
import AppLogo from '../assets/AppLogo';
import HomeIcon from '../assets/HomeIcon';
import { categories } from '../utils/data';
import AvatarGenerator from "../utils/AvatarGenerator";

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle }) => {

  const { user, userImgUrl } = useContext(AuthContext)

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll hide-scrollbar ">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-4"
          onClick={handleCloseSidebar}
        >
          <AppLogo size={70}/>
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <HomeIcon />
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
          to={`user-profile/${user.id}`}
          className="flex my-5 mb-3 gap-2 p-1 items-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <AvatarGenerator size={40} />
          <p>{user?.user_metadata.full_name}</p>
          <RightArrow style={{ maxHeight: "1.75rem" }} />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;