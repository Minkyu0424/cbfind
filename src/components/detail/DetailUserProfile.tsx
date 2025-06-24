import { Link } from "react-router-dom";
import type { UserTypes } from "../../types/common";

interface UserProfileProps {
  user: UserTypes;
  openModal: () => void;
}

const DetailUserProfile = ({ user, openModal }: UserProfileProps) => {
  return (
    <div className="w-full flex justify-between items-end border-b border-b-[var(--gray)] pb-2">
      <div className="flex gap-3">
        <img
          className="w-12 h-12 rounded-full border-2 border-[var(--main)]"
          src={user.profileImage || "/woowang.png"}
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
      <img
        className="w-8 h-8 cursor-pointer"
        src="/siren.svg"
        alt="신고"
        onClick={openModal}
      />
    </div>
  );
};

export default DetailUserProfile;
