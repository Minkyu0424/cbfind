import type { ItemTypes } from "../../types/common";
import { formatDateToKoreanStyle } from "../../utils/time";

interface DetailContentsProps {
  data: ItemTypes;
}

const DetailContents = ({ data }: DetailContentsProps) => {
  const { date, time } = formatDateToKoreanStyle(data.date);

  const timeLabel = data.type === "lost" ? "분실시간" : "습득시간";
  return (
    <div>
      <div className="w-full flex justify-between items-end">
        <p className="text-lg font-bold">{data.title}</p>
        <div className="flex text-xs gap-1 font-medium text-[var(--sub)]">
          <p className="text-black font-medium">{timeLabel} :</p>
          <p>{date +' '+ time}</p>
        </div>
      </div>
      <p className="mt-2 text-sm min-h-20 py-3">{data.content}</p>
      <div className="flex text-xs gap-2 font-semibold mt-2">
        <p>조회수 {data.views}</p>
        <p>채팅 {data.chatCount}</p>
      </div>
    </div>
  );
};

export default DetailContents;
