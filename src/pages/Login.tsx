import LoginContainer from "../components/login/LoginContainer";
import LoginHeader from "../components/login/LoginHeader";

const Login = () => {
  return (
    <div className="size-full flex h-screen flex-col items-center justify-center gap-10">
      <LoginHeader />
      <LoginContainer />
    </div>
  );
};

export default Login;
