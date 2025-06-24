import { useState } from "react";
import { reportPost } from "../../firebase/api/postApi";
import { reportUser } from "../../firebase/api/userApi";

interface ReportModalProps {
  itemId: string;
  authorId: string;
  closeModal: () => void;
}

const ReportModal = ({ itemId, authorId, closeModal }: ReportModalProps) => {
  const [isUser, setIsUser] = useState(true);

  const handleReportPost = async () => {
    try {
      if (isUser) {
        await reportUser(authorId);
      } else {
        await reportPost(itemId);
      }
      alert("신고가 접수되었습니다.");
      closeModal();
    } catch (error) {
      console.error("신고 실패:", error);
      alert("신고 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-50">
      <div className="absolute flex px-5 py-7 flex-col items-center gap-7 bg-white rounded-2xl shadow">
        <p className="text-lg font-semibold">어떤 항목을 신고하시겠습니까?</p>
        <div className="flex w-full px-5 justify-between">
          <div
            className="flex gap-2.5 items-center cursor-pointer"
            onClick={() => setIsUser(true)}
          >
            <img
              src="/check.svg"
              alt="check"
              className={`w-4 h-4 rounded-full ${isUser ? "bg-[var(--main)]" : "bg-[var(--gray)]"}`}
            />
            <p>회원</p>
          </div>
          <div
            className="flex gap-2.5 items-center cursor-pointer"
            onClick={() => setIsUser(false)}
          >
            <img
              src="/check.svg"
              alt="check"
              className={`w-4 h-4 rounded-full ${isUser ? "bg-[var(--gray)]" : "bg-[var(--main)]"}`}
            />
            <p>게시물</p>
          </div>
        </div>
        <div className="flex gap-8 text-sm text-white font-medium">
          <button
            onClick={handleReportPost}
            className="px-9 py-3 bg-[var(--main2)] rounded cursor-pointer"
          >
            신고
          </button>
          <button
            onClick={closeModal}
            className="px-9 py-3 bg-[var(--sub)] rounded cursor-pointer"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
