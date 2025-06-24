import SearchContainer from "../components/search/SearchContainer";
import Header from "../layouts/Header";

const Search = () => {
  return (
    <div className="size-full flex flex-col items-center pb-10">
      <Header />
      <SearchContainer />
    </div>
  );
};

export default Search;
