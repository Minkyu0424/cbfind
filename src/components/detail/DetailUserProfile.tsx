import { Link } from "react-router-dom";
import type { UserTypes } from "../../types/common";
interface UserProfileProps {
  user: UserTypes;
}
const DetailUserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="w-full flex justify-between items-end border-b border-b-[var(--gray)] pb-2">
      <div className="flex gap-3">
        <img
          className="w-12 h-12 rounded-full border-2 border-[var(--main)]"
          src={user.profileImage}
          alt="profile"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{user.name}</p>
          <Link
            to={`/chat/${user.id}`}
            className="text-xs font-medium py-1 px-3 rounded text-black/80 border border-[var(--gray)]"
          >
            채팅
          </Link>
        </div>
      </div>
      <img className="w-9 h-9 cursor-pointer" src="/siren.svg" alt="profile" />
    </div>
  );
};

export default DetailUserProfile;
