import react, { useContext } from "react";
import AppContext from '../../store/AppContext';

function AvatarGenerator() {
  const { userImgUrl } = useContext(AppContext);

  return (
    <img
      className="rounded-full w-12 h-auto shadow-lg  border-transparent border-4"
      src={userImgUrl}
      alt="user-picNEW"
    />
  );
}

export default AvatarGenerator;
