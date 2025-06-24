import { MockItems } from "../../constants/mock";
import CommentContainer from "./Comment/CommentContainer";
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
    <div className="flex flex-col gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-auto mb-4 rounded-xl"
      />
      <DetailUserProfile user={item.user} />
      <DetailContents data={item} />
      <CommentContainer />
      <CommonContents />
    </div>
  );
};

export default DetailContainer;
