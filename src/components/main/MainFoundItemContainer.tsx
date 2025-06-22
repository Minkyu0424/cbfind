import { Link } from "react-router-dom";
import { MockItems } from "../../constants/mock";
import Item from "../common/Item";
import MainItemContainerHeader from "./MainItemContainerHeader";

const MainFoundItemContainer = () => {
  return (
    <div className="size-full">
      <MainItemContainerHeader title="찾았어요" />
      <div className="flex px-2 gap-y-5 justify-between flex-wrap pt-5 pb-3">
        {MockItems.slice(0, 9).map((item) => (
          <Item key={item.title} item={item} />
        ))}
      </div>
      <Link
        to={"/"}
        className="w-full justify-end flex items-center text-[10px] text-[var(--sub)]"
      >
        더 보기
        <img className="w-3 h-3" src="/arrow.svg" />
      </Link>
    </div>
  );
};

export default MainFoundItemContainer;
