import Input from "../common/Input";
interface SearchInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchInput = ({ query, setQuery }: SearchInputProps) => {
  return (
    <div className="relative size-full py-5">
      <img src="/search.svg" className="absolute right-3 top-7 w-8 h-8" />
      <Input
        styleType={"search"}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchInput;
