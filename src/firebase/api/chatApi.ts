import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../setFirebase';

export type Message = {
  senderId: string;
  content: string;
  timestamp?: any;
};

export type Chat = {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastTimestamp?: any;
};

// 채팅방 ID 생성 기준: 두 UID를 정렬해서 하나의 문자열로 만듦
function generateChatId(userA: string, userB: string): string {
  return [userA, userB].sort().join('_');
}

// 1. 채팅방 가져오기 (없으면 생성)
export async function getOrCreateChat(userA: string, userB: string): Promise<string> {
  const chatId = generateChatId(userA, userB);
  const chatRef = doc(db, 'chats', chatId);
  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      participants: [userA, userB],
      lastMessage: '',
      lastTimestamp: serverTimestamp()
    });
  }

  return chatId;
}

// 2. 메시지 전송
export async function sendMessage(chatId: string, message: Message): Promise<void> {
  const msgRef = collection(db, 'chats', chatId, 'messages');
  await addDoc(msgRef, {
    ...message,
    timestamp: serverTimestamp()
  });

  // 마지막 메시지 정보 갱신
  const chatRef = doc(db, 'chats', chatId);
  await setDoc(chatRef, {
    lastMessage: message.content,
    lastTimestamp: serverTimestamp()
  }, { merge: true });
}

// 3. 메시지 불러오기
export async function fetchMessages(chatId: string): Promise<Message[]> {
  const msgRef = collection(db, 'chats', chatId, 'messages');
  const q = query(msgRef, orderBy('timestamp', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as Message);
}
