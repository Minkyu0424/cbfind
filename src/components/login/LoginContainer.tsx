import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";

import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/setFirebase";
import { signOut } from "firebase/auth";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    studentId: "",
    password: "",
  });

  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [pendingUid, setPendingUid] = useState("");

  const handleLogin = async () => {
    const { studentId, password } = loginForm;

    if (!studentId || !password) {
      alert("학번과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 🔍 학번으로 이메일 조회
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("studentId", "==", studentId));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("해당 학번으로 가입된 사용자가 없습니다.");
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = snapshot.docs[0].data();
      const email = userData.email;

      // 🔐 이메일 + 비밀번호로 로그인
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const uid = credential.user.uid;

      // ✅ 동의 여부 확인
      if (!userData.agreedToPolicy) {
        setPendingUid(uid); // 나중에 업데이트할 uid 저장
        setShowPolicyModal(true); // 모달 표시
      } else {
        alert("로그인 성공!");
        navigate("/");
      }

    } catch (error: any) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: " + error.message);
    }
  };

  // ✅ 동의 처리
  const handleAgree = async () => {
    try {
      await updateDoc(doc(db, "users", pendingUid), {
        agreedToPolicy: true,
      });
      alert("동의가 완료되었습니다. 환영합니다!");
      setShowPolicyModal(false);
      navigate("/");
    } catch (error) {
      alert("동의 처리 중 오류 발생");
    }
  };

  // ✅ 비동의 → 로그아웃 처리
  const handleDisagree = async () => {
    await signOut(auth);
    alert("동의하지 않으면 서비스를 이용할 수 없습니다.");
    setShowPolicyModal(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 px-5">
      <p className="text-sm text-[var(--sub)]">
        충북대학교 학생이라면 로그인 후 이용해보세요!
      </p>
      <Input
        styleType={"login"}
        value={loginForm.studentId}
        onChange={(e) =>
          setLoginForm({ ...loginForm, studentId: e.target.value })
        }
        placeholder="학번을 입력"
      />
      <Input
        styleType={"login"}
        type="password"
        value={loginForm.password}
        placeholder="비밀번호를 입력"
        onChange={(e) =>
          setLoginForm({ ...loginForm, password: e.target.value })
        }
      />
      <Button styleType={"login"} text={"로그인"} onClick={handleLogin} />
      <p className="text-sm text-[var(--sub)]">
        학번 또는 비밀번호가 기억나지 않는다면?
      </p>
      <div className="flex gap-1 items-center">
        <Link
          className="text-sm text-[var(--main)]"
          to={"https://www.cbnu.ac.kr/loginView.do"}
        >
          충북대학교로 이동
        </Link>
        <p className="text-sm text-[var(--sub)] pb-0.5">/</p>
        <Link
          className="text-sm text-[var(--main)]"
          to={"/signup"}
        >
          회원가입
        </Link>
      </div>
      {showPolicyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-3">책임 고지 안내</h2>
            <p className="text-sm text-gray-700 mb-5">
              본 서비스는 분실물 중개 플랫폼일 뿐, 실제 물품의 수령 및 분실에 대한 법적 책임은 지지 않습니다.
              이에 동의하셔야 서비스를 이용하실 수 있습니다.
            </p>
            <div className="flex justify-end gap-3">
              <button className="text-red-500" onClick={handleDisagree}>
                동의 안 함
              </button>
              <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleAgree}>
                동의하고 계속하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginContainer;
