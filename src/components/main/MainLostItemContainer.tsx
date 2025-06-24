import { Link } from "react-router-dom";
import Item from "../common/Item";
import MainItemContainerHeader from "./MainItemContainerHeader";

import { useEffect, useState } from "react";
import { fetchPosts } from "../../firebase/api/postApi";
import type { PostData } from "../../firebase/api/postApi";
import defaultImage from "../../defaultImage/defaultImage_lost.png"

const MainLostItemContainer = () => {

  const [lostPosts, setLostPosts] = useState<PostData[]>([]);

  useEffect(() => {
  const fetchLost = async () => {
    try {
      const posts = await fetchPosts("lost");
      setLostPosts(posts);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  fetchLost();
}, []);
  
  return (
    <div className="size-full">
      <MainItemContainerHeader title="찾아주세요" />
      <div className="flex px-2 gap-y-5 justify-between flex-wrap pt-5 pb-3">
        {lostPosts.slice(0, 6).map((post) => (
          <Item
           key={String(post.id)}
            item={{
             id: (post.id ?? '0').toString(), 
              title: post.title,
             content: post.content,
              image: post.imageUrl || defaultImage,
             place: post.place.length > 5 ? post.place.slice(0, 5) + '...' : post.place, // content 일부를 위치로 임시 사용
             date: post.timestamp?.toDate().toISOString() || "",
             type: post.type,
             user: {
                id: 0, // 아직 실제 유저 객체 없으니 임시값
                name: post.authorId,
               profileImage: "/default-profile.png",
             },
             views: 0,
              chatCount: 0,
            }}
         />
        ))}
        
      </div>
      <Link
        to={"/items/found"}
        className="w-full justify-end flex items-center text-[10px] text-[var(--sub)]"
      >
        더 보기
        <img className="w-3 h-3" src="/arrow.svg" />
      </Link>
    </div>
  );
};

export default MainLostItemContainer;