import { MockItems } from "../../constants/mock";
import CommonContents from "./CommonContents";
import DetailContents from "./DetailContents";
import DetailUserProfile from "./DetailUserProfile";

interface DetailContainerProps {
  itemId: string;
}

const DetailContainer = ({ itemId }: DetailContainerProps) => {
  const item = MockItems.find((item) => item.id === Number(itemId));

  if (!item) return <div>해당 아이템을 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col gap-3">
      <img src={item.image} alt={item.title} className="w-full h-auto mb-4" />
      <DetailUserProfile user={item.user} />
      <DetailContents data={item} />
      <CommonContents />
    </div>
  );
};

export default DetailContainer;
