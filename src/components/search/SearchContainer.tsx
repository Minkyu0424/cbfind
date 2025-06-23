import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const SearchContainer = () => {
  return (
    <div className="size-full px-2.5 flex flex-col">
      <SearchInput />
      <SearchResult />
    </div>
  );
};

export default SearchContainer;
