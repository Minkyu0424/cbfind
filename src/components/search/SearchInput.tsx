import Input from "../common/Input";

const SearchInput = () => {
  return (
    <div className="relative size-full py-5">
          <img src="/search.svg" className="absolute right-3 top-7 w-8 h-8"/>
          <Input styleType={"search"} />
    </div>
  );
};

export default SearchInput;
