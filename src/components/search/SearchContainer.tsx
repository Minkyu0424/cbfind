import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const SearchContainer = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="size-full px-2.5 flex flex-col">
      <SearchInput query={query} setQuery={setQuery} />
      <SearchResult query={query} />
    </div>
  );
};

export default SearchContainer;
