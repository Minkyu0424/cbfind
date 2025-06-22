import MainFoundItemContainer from "./MainFoundItemContainer";
import MainLostItemContainer from "./MainLostItemContainer";

const MainContainer = () => {
  return (
    <div className="flex flex-col size-full gap-9">
      <MainLostItemContainer />
      <MainFoundItemContainer />
    </div>
  );
};

export default MainContainer;
