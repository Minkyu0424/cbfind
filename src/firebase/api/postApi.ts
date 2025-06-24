import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  increment,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';

import { db, storage, auth } from '../setFirebase';

// 게시글 타입 정의
export type PostData = {
  id?: string; // Firestore 문서 ID (선택적)
  title: string;
  content: string;
  imageUrl?: string;
  type: 'lost' | 'found';
  authorId: string;
  status?: 'open' | 'closed';
  timestamp?: any;
  place: string;
  date?: string;     
  user?: any;       
  views?: number;   
  chatCount?: number;
  reportCount?: number;
};

const postsRef = collection(db, 'posts');

// ✅ 이미지 업로드
export async function uploadImage(file: File): Promise<string> {
  const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
}

// ✅ 게시글 작성
export async function createPost(post: Omit<PostData, 'id'>): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인한 사용자만 게시글을 작성할 수 있습니다.");

  const newPost = {
    ...post,
    imageUrl: post.imageUrl || '',
    status: 'open',
    timestamp: serverTimestamp(),
    authorId: user.uid,
    reportCount: 0
  };

  const docRef = await addDoc(postsRef, newPost);
  return docRef.id;
}

// ✅ 게시글 수정
export async function updatePost(
  postId: string,
  updated: { title: string; content: string; imageUrl?: string }
): Promise<void> {
  const postDoc = doc(db, 'posts', postId);
  await updateDoc(postDoc, {
    ...updated,
    timestamp: serverTimestamp(),
  });
}

// ✅ 게시글 삭제
export async function deletePost(postId: string): Promise<void> {
  const postDoc = doc(db, 'posts', postId);
  await deleteDoc(postDoc);
}

// ✅ 게시글 전체 목록 (type: 'lost' | 'found')
export async function fetchPosts(type: 'lost' | 'found'): Promise<PostData[]> {
  const q = query(
    postsRef,
    where('type', '==', type),
    where('status', '==', 'open'),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => {
    const data = docSnap.data() as any;
    return {
      id: docSnap.id,
      ...data,
      imageUrl: data.imageUrl || data.image || "", // ✅ 호환 처리
    };
  });
}

// ✅ 게시글 상세 조회
export async function getPostById(postId: string): Promise<PostData> {
  const postDoc = doc(db, 'posts', postId);
  const snapshot = await getDoc(postDoc);
  if (!snapshot.exists()) throw new Error('게시글이 존재하지 않습니다');

  const data = snapshot.data() as any;

  const currentViews = data.views ?? 0;
  await updateDoc(postDoc, { views: currentViews + 1 });
  
  return {
    id: snapshot.id,
    ...data,
    imageUrl: data.imageUrl || data.image || "", // 🔸 image 백업
  };
}

// ✅ 작성자의 게시글만 조회
export async function fetchPostsByUser(authorId: string): Promise<PostData[]> {
  const q = query(
    postsRef,
    where('authorId', '==', authorId),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(docSnap => {
    const data = docSnap.data() as any;

    return {
      id: docSnap.id,
      ...data,
      imageUrl: data.imageUrl || data.image || "", // 🔸 image → imageUrl 백업 처리
    };
  });
}

// ✅ 이미지 삭제
export async function deleteImageByUrl(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    const decodedUrl = decodeURIComponent(imageUrl);
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;
    const path = decodedUrl.replace(baseUrl, '').split('?')[0];
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    console.log('이미지 삭제 완료');
  } catch (error) {
    console.warn('이미지 삭제 중 오류 발생:', error);
  }
}

//신고 누적
export const reportPost = async (postId: string) => {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    reportCount: increment(1),
  });
};
