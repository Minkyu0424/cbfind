import { Link } from "react-router-dom";
import type { UserTypes } from "../../types/common";
import { reportUser } from "../../firebase/api/userApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/setFirebase";

interface UserProfileProps {
  user: UserTypes;
  authorId: string;
  openModal?: () => void;
}

const DetailUserProfile = ({ user, authorId, openModal }: UserProfileProps) => {
  const [currentUser] = useAuthState(auth);

  const handleReportClick = async () => {
    console.log(authorId);
    try {
      await reportUser(authorId);
      alert("신고가 접수되었습니다.");
    } catch {
      alert("신고 처리에 실패했습니다.");
    }
  };

  return (
    <div className="w-full flex justify-between items-end border-b border-b-[var(--gray)] pb-2">
      <div className="flex gap-3">
        <img
          className="w-12 h-12 rounded-full border-2 border-[var(--main)]"
          src={user.profileImage || '/woowang.png'}
          alt="profile"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{user.name}</p>
          {/* ✅ 로그인한 사용자와 작성자가 다를 때만 채팅 버튼 표시 */}
          {currentUser?.uid !== authorId && (
            <Link
              to={`/chat/${authorId}`}
              className="text-xs font-medium py-1 px-3 rounded text-black/80 border border-[var(--gray)]"
            >
              채팅
            </Link>
          )}    
        </div>
      </div>

      <img 
        className="w-9 h-9 cursor-pointer"
        src="/siren.svg"
        alt="신고"
        onClick={() => openModal?.()}
      />
    </div>
  );
};

export default DetailUserProfile;
