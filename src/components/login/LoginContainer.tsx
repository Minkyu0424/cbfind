import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";

const LoginContainer = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    studentId: "",
    password: "",
  });

  const handleLogin = () => {
    if (!loginForm.studentId || !loginForm.password) {
      alert("학번과 비밀번호를 입력해주세요.");
      return;
    }

    navigate("/");
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
    </div>
  );
};

export default LoginContainer;
