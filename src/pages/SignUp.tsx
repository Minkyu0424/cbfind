import { useState } from "react";
import SignUpForm from "../components/signup/SignUpForm";
import SignUpHeader from "../components/signup/SignUpHeader";
import SignUpSubmit from "../components/signup/SignUpSubmit";
import { InitSignUpFormData } from "../constants/items";
import type { SignUpFormTypes } from "../types/common";

const SignUp = () => {
  const [signUpForm, setSignUpForm] =
    useState<SignUpFormTypes>(InitSignUpFormData);
  return (
    <div className="size-full flex h-screen flex-col items-center justify-center gap-8">
      <SignUpHeader />
      <SignUpForm signUpForm={signUpForm} setSignUpForm={setSignUpForm} />
      <SignUpSubmit signUpForm={signUpForm} />
    </div>
  );
};

export default SignUp;
