import { MockItems } from "../../constants/mock";
import Item from "../common/Item";
import { fetchPosts } from "../../firebase/api/postApi";
import { useEffect, useState } from "react";
import defaultImageLost from "../../defaultImage/defaultImage_lost.png";
import defaultImageFound from "../../defaultImage/defaultImage_find.png";

interface SearchResultProps {
  query: string;
}

const SearchResult = ({ query }: SearchResultProps) => {
  const [filteredLostResults, setFilteredLostResults] = useState<any[]>([]);
  
  useEffect(() => {
    const load = async () => {
      const allPosts = await fetchPosts("lost");

      const filtered = allPosts.filter((post) => {
        const keyword = query.toLowerCase();
        return (
          post.title?.toLowerCase().includes(keyword) ||
          post.content?.toLowerCase().includes(keyword) ||
          post.place?.toLowerCase().includes(keyword)
        );
      });

      setFilteredLostResults(filtered);
    };

    if (query.trim()) {
      load();
    } else {
      setFilteredLostResults([]);
    }
  }, [query]);

  const [filteredFoundResults, setFilteredFoundResults] = useState<any[]>([]);
  
  useEffect(() => {
    const load = async () => {
      const allPosts = await fetchPosts("found");

      const filtered = allPosts.filter((post) => {
        const keyword = query.toLowerCase();
        return (
          post.title?.toLowerCase().includes(keyword) ||
          post.content?.toLowerCase().includes(keyword) ||
          post.place?.toLowerCase().includes(keyword)
        );
      });

      setFilteredFoundResults(filtered);
    };

    if (query.trim()) {
      load();
    } else {
      setFilteredFoundResults([]);
    }
  }, [query]);

  return (
    <div className="w-full flex flex-col">
      <p className="py-2 px-2 border-b border-b-[var(--gray)]">
        '찾아요'검색결과: {filteredLostResults ? filteredLostResults.length : 0}건
      </p>
      <div className="flex px-2 w-full flex-wrap pt-5 gap-x-4 gap-y-5">
        <div className="flex px-2 w-full flex-wrap pt-5 gap-x-4 gap-y-5">
  {filteredLostResults && filteredLostResults.length !== 0 ? (
    filteredLostResults.slice(0, 6).map((post) => (
      <Item
        key={String(post.id)}
        item={{
          id: (post.id ?? "0").toString(),
          title: post.title,
          content: post.content,
          image:
            post.imageUrl && post.imageUrl.trim() !== ""
              ? post.imageUrl
              : defaultImageLost,
          place:
            post.place.length > 5 ? post.place.slice(0, 5) + "..." : post.place,
          date: post.timestamp?.toDate().toISOString() || "",
          type: post.type,
          user: {
            id: 0,
            name: post.authorId,
            profileImage: "/default-profile.png",
          },
          views: 0,
          chatCount: 0,
        }}
      />
    ))
  ) : (
    <div className="flex w-full flex-col items-center pt-5">
      <img src="/search.svg" alt="search" className="w-12 h-12" />
      <div className="p-4 text-center text-sm text-[var(--sub)]">
        검색 결과가 없습니다.
      </div>
    </div>
  )}
</div>
      </div>
      <div className="my-6 border-t border-[var(--gray)]" />
      <p className="py-2 px-2 border-b border-b-[var(--gray)]">
        '찾았어요'검색결과: {filteredFoundResults ? filteredFoundResults.length : 0}건
      </p>
      <div className="flex px-2 w-full flex-wrap pt-5 gap-x-4 gap-y-5">
        <div className="flex px-2 w-full flex-wrap pt-5 gap-x-4 gap-y-5">
  {filteredFoundResults && filteredFoundResults.length !== 0 ? (
    filteredFoundResults.slice(0, 6).map((post) => (
      <Item
        key={String(post.id)}
        item={{
          id: (post.id ?? "0").toString(),
          title: post.title,
          content: post.content,
          image:
            post.imageUrl && post.imageUrl.trim() !== ""
              ? post.imageUrl
              : defaultImageFound,
          place:
            post.place.length > 5 ? post.place.slice(0, 5) + "..." : post.place,
          date: post.timestamp?.toDate().toISOString() || "",
          type: post.type,
          user: {
            id: 0,
            name: post.authorId,
            profileImage: "/default-profile.png",
          },
          views: 0,
          chatCount: 0,
        }}
      />
    ))
  ) : (
    <div className="flex w-full flex-col items-center pt-5">
      <img src="/search.svg" alt="search" className="w-12 h-12" />
      <div className="p-4 text-center text-sm text-[var(--sub)]">
        검색 결과가 없습니다.
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default SearchResult;
