import { useEffect, useState } from "react";
import { MockOptions } from "../../constants/items";
import { MockItems } from "../../constants/mock";
import Item from "../common/Item";
import Pagination from "../common/Pagination";
import MainItemContainerHeader from "../main/MainItemContainerHeader";
import ItemsFilterDropdown from "./ItemsFilterDropdown";

import { fetchPosts } from "../../firebase/api/postApi";
import type { PostData } from "../../firebase/api/postApi";
import defaultImage from "../../defaultImage/defaultImage_find.png"

const FoundItemsContainer = () => {
  const [findPosts, setFindPosts] = useState<PostData[]>([]);
  
    useEffect(() => {
    const fetchLost = async () => {
      try {
        const posts = await fetchPosts("lost");
        setFindPosts(posts);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
  
    fetchLost();
  }, []);

  const [, setFilterOption] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  return (
    <div className="size-full">
      <MainItemContainerHeader title="찾아주세요" />
      <div className="w-full flex justify-end pt-3">
        <ItemsFilterDropdown options={MockOptions} onSelect={setFilterOption} />
      </div>
      <div className="flex px-2 gap-y-5 justify-between flex-wrap pt-5 pb-3">
        {findPosts.slice(0, 9).map((post) => (
          <Item
           key={String(post.id)}
            item={{
             id: (post.id ?? '0').toString(), // string → number 변환
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
      <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
    </div>
  );
};

export default FoundItemsContainer;
