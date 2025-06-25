import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/setFirebase';
import { doc, getDoc, collection, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  reportCount: number;
  profileImage?: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  reportCount: number;
}

const AdminReportPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [reportedUsers, setReportedUsers] = useState<User[]>([]);
  const [reportedPosts, setReportedPosts] = useState<Post[]>([]);

  // 🔐 관리자 권한 확인
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();
      const isAdminFlag = data?.isAdmin === true;

      if (!isAdminFlag) {
        alert('관리자 권한이 없습니다.');
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [user, navigate]);

  // 📥 신고된 사용자/게시글 가져오기
  useEffect(() => {
    if (!isAdmin) return;

    const fetchReports = async () => {
      // 유저
      const userQuery = query(collection(db, 'users'), where('reportCount', '>', 0));
      const userSnapshot = await getDocs(userQuery);
      const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
      setReportedUsers(users);

      // 게시글
      const postQuery = query(collection(db, 'posts'), where('reportCount', '>', 0));
      const postSnapshot = await getDocs(postQuery);
      const posts = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[];
      setReportedPosts(posts);
    };

    fetchReports();
  }, [isAdmin]);

  if (isAdmin === null) return <p className="text-center mt-10">관리자 확인 중...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
  <button
    onClick={() => navigate(-1)}
    className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
  >
    ← 
  </button>
  <h1 className="text-2xl font-bold">🚨 관리자 신고 현황</h1>
</div>

      {/* 👤 신고된 사용자 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">신고된 사용자</h2>
        {reportedUsers.length === 0 ? (
          <p>신고된 사용자가 없습니다.</p>
        ) : (
          <ul className="space-y-3">
  {reportedUsers.map((user) => (
    <li key={user.id} className="border p-3 rounded flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={user.profileImage || '/woowang.png'}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-600">신고 횟수: {user.reportCount}</p>
        </div>
      </div>

      {/* 정지 여부에 따라 버튼 표시 */}
      {user.isBanned ? (
        <button
          onClick={async () => {
            const confirm = window.confirm(`'${user.name}' 유저의 정지를 해제하시겠습니까?`);
            if (!confirm) return;

            try {
              await updateDoc(doc(db, "users", user.id), {
                isBanned: false
              });
              alert("정지가 해제되었습니다.");
              // UI 업데이트를 위해 상태 리프레시 필요 시 여기서 처리
            } catch (err) {
              console.error("정지 해제 실패:", err);
              alert("정지 해제에 실패했습니다.");
            }
          }}
          className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          정지 해제
        </button>
      ) : (
        <button
          onClick={async () => {
            const confirm = window.confirm(`'${user.name}' 유저를 정지하시겠습니까?`);
            if (!confirm) return;

            try {
              await updateDoc(doc(db, "users", user.id), {
                isBanned: true
              });
              alert("유저가 정지되었습니다.");
              // UI 업데이트를 위해 상태 리프레시 필요 시 여기서 처리
            } catch (err) {
              console.error("유저 정지 실패:", err);
              alert("정지 처리에 실패했습니다.");
            }
          }}
          className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          정지하기
        </button>
      )}
    </li>
  ))}
</ul>

        )}
      </section>

      <hr className="my-8" />

      {/* 📝 신고된 게시글 */}
      <section>
        <h2 className="text-xl font-semibold mb-3">신고된 게시글</h2>
        {reportedPosts.length === 0 ? (
          <p>신고된 게시글이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {reportedPosts.map(post => (
              <li key={post.id} className="border p-3 rounded">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-600">신고 횟수: {post.reportCount}</p>
                <p className="text-sm mt-1 text-gray-700">{post.content.slice(0, 50)}...</p>
                <div className="flex gap-2 mt-2">
        {/* 🔍 상세보기 버튼 */}
        <button
          onClick={() => navigate(`/detail?itemId=${post.id}`)}
          className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
        >
          상세보기
        </button>

        {/* 🗑 삭제 버튼 */}
        <button
          onClick={async () => {
            const confirm = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
            if (!confirm) return;

            try {
              await deleteDoc(doc(db, "posts", post.id));
              setReportedPosts((prev) => prev.filter((p) => p.id !== post.id));
              alert("게시글이 삭제되었습니다.");
            } catch (err) {
              console.error("게시글 삭제 실패:", err);
              alert("삭제 중 오류가 발생했습니다.");
            }
          }}
          className="text-sm px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
        >
          삭제
        </button>
      </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminReportPage;
