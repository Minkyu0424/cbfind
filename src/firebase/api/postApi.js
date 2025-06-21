// firebaseApi.js
import { db, storage } from './firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

const postsRef = collection(db, 'posts');

//이미지 업로드
export async function uploadImage(file) {
  const fileRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const downloadUrl = await getDownloadURL(fileRef);
  return downloadUrl;
}

// 게시글 작성
export async function createPost({ title, content, imageUrl = '', type, authorId }) {
  const newPost = {
    title,
    content,
    imageUrl,
    type, // "lost" or "found"
    authorId,
    status: 'open',
    timestamp: serverTimestamp(),
  };

  const docRef = await addDoc(postsRef, newPost);
  return docRef.id;
}

// 게시글 수정
export async function updatePost(postId, { title, content, imageUrl }) {
  const postDoc = doc(db, 'posts', postId);

  await updateDoc(postDoc, {
    title,
    content,
    imageUrl,
    timestamp: serverTimestamp(), // 수정 시점 갱신
  });
}

// 게시글 삭제
export async function deletePost(postId) {
  const postDoc = doc(db, 'posts', postId);
  await deleteDoc(postDoc);
}

// 모든 게시글 불러오기 (type: "lost" or "found")
export async function fetchPosts(type) {
  const q = query(
    postsRef,
    where('type', '==', type),
    where('status', '==', 'open'),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 게시글 상세 가져오기
export async function getPostById(postId) {
  const postDoc = doc(db, 'posts', postId);
  const snapshot = await getDoc(postDoc);
  if (!snapshot.exists()) throw new Error('게시글이 존재하지 않습니다');
  return { id: snapshot.id, ...snapshot.data() };
}

// 내 게시글만 가져오기
export async function fetchPostsByUser(authorId) {
  const q = query(
    postsRef,
    where('authorId', '==', authorId),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}