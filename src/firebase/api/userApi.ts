//user 회원가입, 회원탈퇴, 로그인, 로그아웃 등 관련 api
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../setFirebase';

// 1. 회원가입 (학번, 비밀번호, 이름)
export async function signUpUser({ studentId, password, name }) {
  const email = `${studentId}@chungbuk.ac.kr`;

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    name,
    studentId,
    email,
    isAdmin: false
  });

  return user;
}

// 2. 로그인
export async function signInUser({ studentId, password }) {
  const email = `${studentId}@chungbuk.ac.kr`;
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// 3. 로그아웃
export async function signOutUser() {
  await signOut(auth);
}

// 4. 회원탈퇴 (Auth 계정 + Firestore 사용자 정보 삭제)
export async function deleteUserAccount() {
  const user = auth.currentUser;
  if (!user) throw new Error('로그인된 사용자가 없습니다.');

  await deleteDoc(doc(db, 'users', user.uid)); // Firestore에서 사용자 삭제
  await deleteUser(user); // Firebase Auth 사용자 삭제
}
