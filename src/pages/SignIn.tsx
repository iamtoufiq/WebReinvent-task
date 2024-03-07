import { useEffect } from "react";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
const SignIn = () => {
  useEffect(() => {
    document.title = "Sign In";
    return () => {
      document.title = "User Management Dashboard";
    };
  }, []);
  return (
    <div className="max-w-[95%] md:w-full m-auto flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
};

export default SignIn;
