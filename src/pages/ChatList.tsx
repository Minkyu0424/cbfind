import { useEffect, useState } from 'react';
import { auth } from '../firebase/setFirebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import type { Chat } from '../firebase/api/chatApi';
import { fetchMyChats } from '../firebase/api/chatApi';
import { getUserNameById } from "../firebase/api/userApi";

type ChatWithName = Chat & {
  otherName: string;
};

const ChatList = () => {

  const [user] = useAuthState(auth);
  const [chats, setChats] = useState<ChatWithName[]>([]);

  useEffect(() => {
  if (!user) return;

  const loadChats = async () => {
    const rawChats = await fetchMyChats(user.uid);

    const chatsWithNames = await Promise.all(
      rawChats.map(async (chat) => {
        const otherId = chat.participants.find((p) => p !== user.uid) ?? "";
        
        const otherName = await getUserNameById(otherId); // 이름 가져오기
        console.log(rawChats);
        return { ...chat, otherName };
      })
    );

    setChats(chatsWithNames);
  };

  loadChats();
}, [user]);

  if (!user) return <p>로그인이 필요합니다</p>;
  console.log(user);
  
  return (
    <div className="max-w-xl mx-auto p-4">
        
        <div className="flex justify-between items-center mb-4">
  <Link
    to="/"
    className="px-3 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition"
  >
    🏠 메인으로
  </Link>
  <h2 className="text-xl font-bold">채팅 목록</h2>
</div>

      {chats.length === 0 ? (
        <p>진행 중인 채팅이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {chats.map(chat => {
            // 상대방 ID만 추출 (나를 제외한)
            const otherId = chat.participants.find(p => p !== user.uid) ?? "알 수 없음";
            const otherName = chat.otherName;
            return (
              <li
                key={chat.id}
                className="border rounded px-4 py-3 flex flex-col hover:bg-gray-50 transition"
              >
                <Link
  to={`/chat/${otherId}`}
  className="font-medium"
  style={{ color: "#841331" }} // 충북대 색상
>
  👉 {otherName}님과의 채팅
</Link>
                <p className="text-sm text-gray-700 mt-1">
                  최근: {chat.lastMessage || '대화 없음'}
                </p>
                {chat.lastTimestamp && (
                  <p className="text-xs text-gray-400">
                    {chat.lastTimestamp.toDate().toLocaleString()}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
