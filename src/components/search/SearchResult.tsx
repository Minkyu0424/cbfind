import { MockItems } from "../../constants/mock";
import Item from "../common/Item";

interface SearchResultProps {
  query: string;
}

const SearchResult = ({ query }: SearchResultProps) => {
  const filteredResults =
    query !== "" &&
    MockItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );
  return (
    <div className="w-full flex flex-col">
      <p className="py-2 px-2 border-b border-b-[var(--gray)]">
        검색결과: {filteredResults ? filteredResults.length : 0}건
      </p>
      <div className="flex px-2 w-full flex-wrap pt-5 gap-x-4 gap-y-5">
        {filteredResults && filteredResults.length !== 0 ? (
          filteredResults.map((item) => <Item item={item} />)
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
  );
};

export default SearchResult;
