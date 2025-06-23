import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Items from "../pages/Items";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Upload from "../pages/Upload";
import Search from "../pages/Search";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items/*" element={<Items />} />
      <Route path="/detail/*" element={<Detail />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
