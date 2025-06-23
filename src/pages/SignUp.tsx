import { useState } from "react";
import SignUpForm from "../components/signup/SignUpForm";
import SignUpHeader from "../components/signup/SignUpHeader";
import SignUpSubmit from "../components/signup/SignUpSubmit";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    studentId: "",
    password: "",
  });
  return (
    <div className="size-full flex h-screen flex-col items-center justify-center gap-10">
      <SignUpHeader />
      <SignUpForm />
      <SignUpSubmit />
    </div>
  );
};

export default SignUp;
