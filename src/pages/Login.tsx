import { LoginForm } from "@/components/LoginForm";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const Login = () => {
  const token = useAppSelector(useCurrentToken);
  console.log(token);
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
};

export default Login;
