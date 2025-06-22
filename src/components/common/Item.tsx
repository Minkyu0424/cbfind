import { Link } from "react-router-dom";
import type { ItemTypes } from "../../types/common";

interface ItemProps {
  item: ItemTypes;
}
const Item = ({ item }: ItemProps) => {
  const today = new Date().getTime();
  const transDate = (date: string) => {
    const uploadDate = new Date(date).getTime();
    return Math.floor((today - uploadDate) / (1000 * 60 * 60 * 24));
  };
  return (
    <Link
      className="flex flex-col w-[30%] border-b border-b-[var(--gray)] pb-2 cursor-pointer"
      to={`/detail?itemId=${item.id}`}
    >
      <div className="flex flex-col gap-2 pl-1">
        <img
          className="w-full aspect-square object-cover rounded-xl"
          src={item.image}
        />
        <p className="text-[15px] font-semibold">{item.title}</p>
        <p className="text-xs w-full h-8 text-ellipsis overflow-hidden">
          {item.content}
        </p>
        <div className="flex w-full justify-between items-end">
          <p className="py-0.5 px-1 text-[10px] bg-[var(--sub2)] rounded">
            {item.place}
          </p>
          <p className="text-[10px] font-medium">
            {transDate(item.date) < 1 ? "오늘" : `${transDate(item.date)}일전`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
