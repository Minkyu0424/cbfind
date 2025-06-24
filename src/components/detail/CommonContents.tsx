import { MockItems } from "../../constants/mock";
import Item from "../common/Item";

const CommonContents = () => {
  return (
    <div className="mt-3">
      <div className="flex items-end w-full py-2.5 justify-between border-b border-b-[var(--gray)]">
        <p className="text-2xl font-semibold">유사한 게시물</p>
      </div>
      <div className="flex w-full gap-y-5 justify-between flex-wrap pt-5 pb-3">
        {MockItems.slice(0, 6).map((item) => (
          <Item key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CommonContents;
