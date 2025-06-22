import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../setFirebase';

type CommentData = {
  authorId: string;
  content: string;
};

// 1. 댓글 작성
export async function addComment(postId: string, comment: CommentData) {
  const commentRef = collection(db, 'posts', postId, 'comments');
  await addDoc(commentRef, {
    ...comment,
    timestamp: serverTimestamp()
  });
}

// 2. 댓글 불러오기
export async function fetchComments(postId: string) {
  const commentRef = collection(db, 'posts', postId, 'comments');
  const q = query(commentRef, orderBy('timestamp', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 3. 댓글 삭제 (옵션)
export async function deleteComment(postId: string, commentId: string) {
  const commentDoc = doc(db, 'posts', postId, 'comments', commentId);
  await deleteDoc(commentDoc);
}
