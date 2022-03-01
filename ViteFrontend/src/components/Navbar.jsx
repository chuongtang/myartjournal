import React, { useContext } from 'react';
import AppContext from '../../store/AppContext'
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, PlusIcon, AvatarGenerator } from '../assets';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext)
  if (user) {
    return (
      <div className="flex gap-2 md:gap-4 w-full mt-5 pb- ">
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
          <Link to="/create-art" className="animate-bounce rounded-lg w-12 h-12 md:w-10 md:h-10 flex justify-center items-center">
            <PlusIcon />
          </Link>
        </div>
      </div>
    );
  }
  return null;
};

export default Navbar;