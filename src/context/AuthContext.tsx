// AuthContext.tsx

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/setFirebase';
import { useNavigate } from 'react-router-dom';

type UserInfo = {
  name: string;
  studentId: string;
  email: string;
  isAdmin: boolean;
  isBanned?: boolean;
};

type AuthContextType = {
  user: FirebaseUser | null;
  userInfo: UserInfo | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userInfo: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data() as UserInfo;

          // ⛔️ 정지된 유저라면 강제 로그아웃
          if (data.isBanned) {
            alert('정지된 계정입니다. 관리자에게 문의하세요.');
            await signOut(auth);
            setUser(null);
            setUserInfo(null);
            window.location.href = '/login';
            return;
          }

          setUserInfo(data);
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
