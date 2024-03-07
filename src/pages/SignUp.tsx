import { useEffect } from "react";
import AuthForm from "../components/AuthForm";

import Logo from "../components/Logo";
const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up";
    return () => {
      document.title = "User Management Dashboard";
    };
  }, []);
  return (
    <div className="h-screen max-w-[95%] md:w-full m-auto flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
};

export default SignUp;
