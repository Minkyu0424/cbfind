//import { MockItems } from "../../constants/mock";
import CommonContents from "./CommonContents";
import DetailContents from "./DetailContents";
import DetailUserProfile from "./DetailUserProfile";

import { useEffect, useState } from "react";
import { getPostById } from "../../firebase/api/postApi";
import type { PostData } from "../../firebase/api/postApi"; 
import { deletePost } from "../../firebase/api/postApi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/setFirebase";
import { useNavigate } from "react-router-dom";

interface DetailContainerProps {
  itemId: string;
}

const DetailContainer = ({ itemId }: DetailContainerProps) => {
  const [item, setItem] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
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
       <DetailUserProfile user={item.user} />
       {user?.uid === item?.authorId && (
        <button
          onClick={handleDelete}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded self-end"
        >
          삭제하기
        </button>
      )}
       <img className="w-9 h-9 cursor-pointer" src="/siren.svg" alt="profile" />
       {
  item.imageUrl && item.imageUrl.startsWith("http") ? (
    <img
      src={item.imageUrl.replace("http://", "https://")}
      alt={item.title}
      className="w-full h-auto mb-4 rounded-xl"
    />
  ) : null
}
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
    type: item.type
    }}
/>
      <CommonContents />
    </div>
  );
};

export default DetailContainer;
