import React, { useContext } from 'react';
import AuthContext from '../../store/authContext'
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from "../assets/SearchIcon.jsx"
import PlusIcon from "../assets/PlusIcon.jsx";
import AvatarGenerator from "../utils/AvatarGenerator"


const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { user, userImgUrl} = useContext(AuthContext)
  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <SearchIcon style={{ maxHeight: "3rem" }} />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex ">
          <Link to={`user-profile/${user?.id}`} className="hidden md:block">
            <AvatarGenerator />
          </Link>
          <Link to="/create-art" className=" rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <PlusIcon />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;