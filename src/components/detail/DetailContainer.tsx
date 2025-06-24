//import { MockItems } from "../../constants/mock";
import CommentContainer from "./Comment/CommentContainer";

import CommonContents from "./CommonContents";
import DetailContents from "./DetailContents";
import DetailUserProfile from "./DetailUserProfile";

import { useEffect, useState } from "react";
import { getPostById } from "../../firebase/api/postApi";
import type { PostData } from "../../firebase/api/postApi";

interface DetailContainerProps {
  itemId: string;
}

const DetailContainer = ({ itemId }: DetailContainerProps) => {
  const [item, setItem] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

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
      <img 
        src={item.imageUrl?.startsWith("http") ? item.imageUrl.replace("http://", "https://") : "/default.png"}
        alt={item.title}
       className="w-full h-auto mb-4 rounded-xl" />
      {/* <DetailUserProfile user={item.user} /> */}
      <DetailContents
  data={{ 
    id: item.id,
    title: item.title,
    content: item.content,
    image: item.imageUrl || "/default.png", // ✅ 이름 변환
    place: item.place,
    date: item.date ?? "",                  // ✅ 기본값
    user: item.user || { name: "익명" },     // ✅ 더미 데이터 대응
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
