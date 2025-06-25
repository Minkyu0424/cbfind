import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/setFirebase";
import { doc, getDoc, collection, onSnapshot} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ShieldCheck } from "lucide-react";


const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // 관리자 여부
  const [unreadCount, setUnreadCount] = useState<number>(0);
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
          setIsAdmin(data.isAdmin === true); // 관리자 여부 설정
        }
      } catch (error) {
        console.error("유저 이름 불러오기 실패:", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "unreadChats"),
      (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.count) {
            total += data.count;
          }
        });
        setUnreadCount(total);
      }
    );

    return () => unsubscribe();
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

        
        {isAdmin ? (
          <Link to="/admin" className="relative flex pr-1 cursor-pointer">
            <ShieldCheck className="w-6 h-6 text-blue-800" />
          </Link>
        ) : (
          
          <div className="relative flex pr-1 cursor-pointer">
            <img
          src="/ci_chat.svg"
          alt="chat SVG"
          className="w-6 h-6 cursor-pointer"
          onClick={handleClick}
        />
            {unreadCount > 0 && (
              <div className="flex items-center justify-center text-[10px] w-4 h-4 absolute right-0.5 top-[-2px] bg-red-600 rounded-full text-white">
                {unreadCount}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
