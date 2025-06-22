import { useLocation } from "react-router-dom";
import DetailContainer from "../components/detail/DetailContainer";
import Header from "../layouts/Header";

const Detail = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const itemId = params.get("itemId");

  return (
    <div className="size-full flex flex-col items-center pb-5">
      <Header />
      {itemId ? (
        <DetailContainer itemId={itemId} />
      ) : (
        <div>잘못된 경로입니다.</div>
      )}
    </div>
  );
};

export default Detail;
