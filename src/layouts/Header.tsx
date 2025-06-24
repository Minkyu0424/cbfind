import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/setFirebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";


const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserName(data.name || "");
        }
      } catch (error) {
        console.error("유저 이름 불러오기 실패:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    }
  };

  const handleClick = () => {
    navigate("/chats"); 
  };

  return (
    <div className="w-full px-3 py-4 flex justify-between items-center">
      <Link to="/" className="flex gap-3 items-center">
        <img src="/cnuniv.svg" alt="Login SVG" className="w-6 h-7" />
        <p className="font-yangjin">찾아줄게</p>
      </Link>
      <div className="flex items-end gap-1.5 relative">
        <p
          onClick={() => setIsClicked(!isClicked)}
          className="text-sm font-medium cursor-pointer"
        >
          {userName ? `${userName}님` : "로그인 중..."}
        </p>
        {isClicked && (
          <div className="absolute top-7 left-9 flex flex-col text-xs font-medium border border-[var(--sub)]/80 bg-white rounded z-10">
            <button
              className="px-2.5 pt-2 pb-1.5 text-center hover:bg-zinc-200"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}

        <img
          src="/ci_chat.svg"
          alt="chat SVG"
          className="w-6 h-6 cursor-pointer"
          onClick={handleClick}
        />
        <div className="relative flex pr-1 cursor-pointer">
          <img src="/Frame.svg" alt="alarm SVG" className="w-6 h-5.5"/>
          <div className="flex items-center justify-center text-[10px] w-4 h-4 absolute right-0.5 top-[-2px] bg-red-600 rounded-full text-white">
            13
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
