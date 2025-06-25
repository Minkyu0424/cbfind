//import { MockItems } from "../../constants/mock";
import CommonContents from "./CommonContents";
import DetailContents from "./DetailContents";
import DetailUserProfile from "./DetailUserProfile";

import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import type { PostData } from "../../firebase/api/postApi";
import { deletePost, getPostById } from "../../firebase/api/postApi";
import { auth, db } from "../../firebase/setFirebase";
import CommentContainer from "./Comment/CommentContainer";
import ReportModal from "./ReportModal";
import { updateDoc, doc } from "firebase/firestore";

interface DetailContainerProps {
  itemId: string;
}

const DetailContainer = ({ itemId }: DetailContainerProps) => {
  const [item, setItem] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 게시글 삭제
  const handleDelete = async () => {
    if (confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        await deletePost(itemId);
        alert("게시글이 삭제되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleComplete = async () => {
  if (confirm("이 게시글을 완료 처리하시겠습니까?")) {
    try {
      const postRef = doc(db, "posts", itemId);
      await updateDoc(postRef, {
        isCompleted: true
      });
      alert("게시글이 완료 처리되었습니다.");
      // 옵션: navigate("/") 또는 새로고침
    } catch (error) {
      console.error("완료 처리 실패:", error);
      alert("게시글 완료 중 오류가 발생했습니다.");
    }
  }
};

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const post = await getPostById(itemId);
        setItem(post);
      } catch (error) {
        console.error("게시글 로드 실패:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) return <div>불러오는 중...</div>;
  if (!item) return <div>해당 아이템을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col gap-3">
      <DetailUserProfile user={item.user} authorId={item.authorId} openModal={openModal}/>
      <div className="flex justify-end items-center gap-3 mt-2">
        {user?.uid === item?.authorId && (
  <div className="flex gap-2 mt-2">
    <button
      onClick={handleDelete}
      className="text-sm px-3 py-1.5 rounded text-white"
      style={{ backgroundColor: "#960051" }} // 충북대 자주색
    >
      삭제하기
    </button>
    <button
      onClick={handleComplete}
      className="text-sm px-3 py-1.5 rounded text-white"
      style={{ backgroundColor: "#5A0D36" }} // 충북대 보조 자주톤
    >
      완료하기
    </button>
  </div>
)}

      </div>
      {item.imageUrl && item.imageUrl.startsWith("http") ? (
        <img
          src={item.imageUrl.replace("http://", "https://")}
          alt={item.title}
          className="w-full h-auto mb-4 rounded-xl"
        />
      ) : null}
      <DetailContents
        data={{
          id: item.id,
          title: item.title,
          content: item.content,
          image: item.imageUrl || "null",
          place: item.place,
          date: item.date ?? "",
          user: item.user || { name: "익명" },
          views: item.views || 0,
          chatCount: item.chatCount || 0,
          type: item.type,
          isCompleted: item.isCompleted
        }}
      />
      {isOpen && (
        <ReportModal
          itemId={item.id || ""}
          authorId={item.authorId}
          closeModal={() => setIsOpen(false)}
        />
      )}

      <CommentContainer />
      <CommonContents />
    </div>
  );
};

export default DetailContainer;
