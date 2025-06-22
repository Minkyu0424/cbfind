import { useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import FoundItemsContainer from "../components/Items/FoundItemsContainer";
import LostItemsContainer from "../components/Items/LostItemsContainer";

const Items = () => {
  const { pathname } = useLocation();
  return (
    <div className="size-full flex flex-col items-center pb-5">
      <Header />
      {pathname === "/items/found" ? (
        <FoundItemsContainer />
      ) : pathname === "/items/lost" ? (
        <LostItemsContainer />
      ) : (
        <div>잘못된 경로입니다.</div>
      )}
    </div>
  );
};

export default Items;
