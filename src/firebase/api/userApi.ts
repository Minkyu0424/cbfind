//user 회원가입, 회원탈퇴, 로그인, 로그아웃 등 관련 api
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../setFirebase';

// 사용자 정보 타입
export type UserInfo = {
  name: string;
  studentId: string;
  email: string;
  isAdmin: boolean;
};

// 회원가입
export async function signUpUser({
  name,
  studentId,
  email,
  password
}: {
  name: string;
  studentId: string;
  email: string;
  password: string;
}): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  const userData: UserInfo = {
    name,
    studentId,
    email,
    isAdmin: false // 기본값: 일반 사용자
  };

  await setDoc(doc(db, 'users', uid), userData);
}

// 로그인
export async function signInUser({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

// 로그아웃
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

// 회원탈퇴
export async function deleteUserAccount(): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('로그인된 사용자가 없습니다');

  await deleteDoc(doc(db, 'users', currentUser.uid));
  await deleteUser(currentUser);
}
