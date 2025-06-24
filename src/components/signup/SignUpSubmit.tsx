import { Link } from "react-router-dom";
import type { SignUpFormTypes } from "../../types/common";
import Button from "../common/Button";

interface SignUpSubmitProps {
  signUpForm: SignUpFormTypes;
}

const SignUpSubmit = ({ signUpForm }: SignUpSubmitProps) => {
  const handleSignUp = () => {
    if (!signUpForm.name || !signUpForm.studentId || !signUpForm.password) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    // 여기에 회원가입 로직을 추가해 학준아
    alert("회원가입이 완료되었습니다!");
  };
  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <div className="flex flex-col w-full items-center gap-2">
        <Link to={"/login"} className="w-full">
          <Button styleType={"login"} text={"회원가입"} />
        </Link>
        <p className="text-xs text-zinc-400">나의 학번이기억나지 않는다면?</p>
        <Link
          className="text-xs text-[var(--main)]"
          to={"https://www.cbnu.ac.kr/loginView.do"}
        >
          충북대학교로 이동
        </Link>
      </div>
      <Button styleType={"signup"} text={"로그인"} onClick={handleSignUp} />
    </div>
  );
};

export default SignUpSubmit;
