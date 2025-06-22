import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Items from "../pages/Items";
import Login from "../pages/Login";
import Main from "../pages/Main";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items/*" element={<Items />} />
      <Route path="/detail/*" element={<Detail />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
