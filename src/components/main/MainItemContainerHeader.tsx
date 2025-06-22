import { Link } from "react-router-dom";

interface MainItemContainerHeaderProps {
  title: string;
}

const MainItemContainerHeader = ({ title }: MainItemContainerHeaderProps) => {
  return (
    <div className="flex items-end w-full px-3 py-2.5 justify-between border-b border-b-[var(--gray)]">
      <p className="text-2xl font-semibold">{title}</p>
      <div className="flex gap-1 items-center">
        <Link to={"search"}>
          <img src="/search.svg" alt="search SVG" className="w-4 h-4" />
        </Link>
        <Link
          className="px-[5px] py-[3px] text-[10px] text-white bg-[var(--main2)] rounded"
          to={"/upload"}
        >
          게시물 등록
        </Link>
      </div>
    </div>
  );
};

export default MainItemContainerHeader;
