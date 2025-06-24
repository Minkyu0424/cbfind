import type { SignUpFormTypes } from "../../types/common";
import Input from "../common/Input";

interface SignUpFormProps {
  signUpForm: SignUpFormTypes;
  setSignUpForm: React.Dispatch<React.SetStateAction<SignUpFormTypes>>;
}

const SignUpForm = ({ signUpForm, setSignUpForm }: SignUpFormProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-zinc-400 pl-2">이름</p>
        <Input
          styleType={"search"}
          value={signUpForm.name}
          onChange={(e) =>
            setSignUpForm({ ...signUpForm, name: e.target.value })
          }
          placeholder="이름을 입력"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-zinc-400 pl-2">학번</p>
        <Input
          styleType={"search"}
          value={signUpForm.studentId}
          onChange={(e) =>
            setSignUpForm({ ...signUpForm, studentId: e.target.value })
          }
          placeholder="학번을 입력"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-zinc-400 pl-2">비밀번호</p>
        <Input
          styleType={"search"}
          value={signUpForm.password}
          onChange={(e) =>
            setSignUpForm({ ...signUpForm, password: e.target.value })
          }
          placeholder="영문 대/소문자, 숫자, 특수문자 포함 8자 이내"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
