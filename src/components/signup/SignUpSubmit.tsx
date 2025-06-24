import { Link, useNavigate } from "react-router-dom";
import type { SignUpFormTypes } from "../../types/common";
import Button from "../common/Button";

import { signUpUser } from "../../firebase/api/userApi";

interface SignUpSubmitProps {
  signUpForm: SignUpFormTypes;
}

const SignUpSubmit = ({ signUpForm }: SignUpSubmitProps) => {
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { name, studentId, email, password, agreedToPolicy } = signUpForm;
    const reportCount = 0;

    if (!name || !studentId || !email || !password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      await signUpUser({ name, studentId, email, password, agreedToPolicy, reportCount});
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 조건 만족 시에만 이동
    } catch (error: any) {
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <div className="flex flex-col w-full items-center gap-2">
        <button className="w-full" onClick={handleSignUp}>
          <Button styleType="login" text="회원가입" />
        </button>
        <p className="text-xs text-zinc-400">나의 학번이기억나지 않는다면?</p>
        <Link
          className="text-xs text-[var(--main)]"
          to={"https://www.cbnu.ac.kr/loginView.do"}
        >
          충북대학교로 이동
        </Link>
      </div>
    </div>
  );
};

export default SignUpSubmit;
