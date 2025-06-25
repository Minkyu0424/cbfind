//user 회원가입, 회원탈퇴, 로그인, 로그아웃 등 관련 api
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, deleteDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { auth, db } from '../setFirebase';

// 사용자 정보 타입
export type UserInfo = {
  name: string;
  studentId: string;
  email: string;
  isAdmin: boolean;
  agreedToPolicy: boolean;
  reportCount: number;
  isBanned: false;
};

// 회원가입
export async function signUpUser({
  name,
  studentId,
  email,  
  password,
  agreedToPolicy,
  reportCount,
  isBanned
}: {
  name: string;
  studentId: string;
  email: string;
  password: string;
  agreedToPolicy: boolean;
  reportCount: number;
  isBanned: boolean;
}): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  const userData: UserInfo = {
    name,
    studentId,
    email,
    isAdmin: false, // 기본값: 일반 사용자
    agreedToPolicy: false,
    reportCount: 0,
    isBanned: false
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

// 유저신고
export const reportUser = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId); // "users"는 유저 컬렉션 이름
    console.log(userRef);
    await updateDoc(userRef, {
      reportCount: increment(1),
    });
  } catch (error) {
    console.error("신고 실패:", error);
    throw error;
  }
};

export const getUserNameById = async (userId: string): Promise<string> => {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().name || "알 수 없음";
  }
  return "알 수 없음";
};

//isAdmin?
export const isAdminUser = async (uid: string): Promise<boolean> => {
  const userDoc = await getDoc(doc(db, "users", uid));
  const data = userDoc.data();
  return data?.isAdmin === true;
};
