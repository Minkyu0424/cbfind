import { Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Items from "../pages/Items";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Upload from "../pages/Upload";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import ChatRoom from '../pages/ChatRoom';
import ChatList from "../pages/ChatList";
import AdminReportPage from "../pages/AdminReport";

const AppRouter = () => (
  
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items/*" element={<Items />} />
      <Route path="/detail/*" element={<Detail />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/search" element={<Search />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat/:id" element={<ChatRoom />} />
      <Route path="/chats" element={<ChatList />} />
      <Route path="/admin" element={<AdminReportPage />} />
    </Routes>
  
);

export default AppRouter;
