import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/setFirebase';
import { useNavigate } from 'react-router-dom';
import {
  getOrCreateChat,
  fetchMessages,
  sendMessage,
  type Message,
} from '../firebase/api/chatApi';

const ChatRoom = () => {
  const { id: otherUserId } = useParams(); // 상대방 UID
  const [user] = useAuthState(auth); // 현재 로그인된 유저
  const [chatId, setChatId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  // 채팅방 ID 확보 및 메시지 불러오기
  useEffect(() => {
    if (!user || !otherUserId) return;

    const setupChat = async () => {
      const newChatId = await getOrCreateChat(user.uid, otherUserId);
      console.log(user.uid);
      console.log(otherUserId);
      setChatId(newChatId);

      const loadedMessages = await fetchMessages(newChatId);
      setMessages(loadedMessages);
    };

    setupChat();
  }, [user, otherUserId]);

  // 메시지 전송
  const handleSend = async () => {
    if (!text.trim() || !chatId || !user) return;

    await sendMessage(chatId, {
      senderId: user.uid,
      content: text,
    });

    setText('');
    const updated = await fetchMessages(chatId);
    setMessages(updated);
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto p-4">
      <div className="relative mb-4">
  <h2 className="text-lg font-bold text-center">채팅</h2>
  <button
    onClick={() => navigate(-1)}
    className="absolute right-0 top-0 text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
  >
    ←
  </button>
</div>
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto border p-3 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${
              msg.senderId === user?.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <span
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.senderId === user?.uid
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
