import MainContainer from "../components/main/MainContainer";
import Header from "../layouts/Header";

const Main = () => {
  return (
    <div className="size-full flex flex-col items-center">
      <Header />
      <MainContainer />
    </div>
  );
};

export default Main;
