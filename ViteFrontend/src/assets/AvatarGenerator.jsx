import react, { useContext } from "react";
import AuthContext from '../../store/authContext';

function AvatarGenerator() {
  const { userImgUrl } = useContext(AuthContext);

  return (
    <img
      className="rounded-full w-12 h-auto shadow-lg  border-transparent border-4"
      src={userImgUrl}
      alt="user-picNEW"
    />
  );
}

export default AvatarGenerator;
