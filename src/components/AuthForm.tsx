import React, { useEffect } from "react";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Input from "./Input";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useApiCall from "../hooks/usePost";

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading, apiCall } = useApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (location?.pathname !== "/signin") {
        const registrationData = {
          email: data?.email,
          password: data?.password,
        };
        apiCall("/register", registrationData, "Registration successful!");
      }

      if (location?.pathname === "/signin") {
        const signInData = {
          email: data?.email,
          password: data?.password,
        };
        apiCall("/login", signInData, "Login successful!");
      }
    } catch (error) {
      toast.error("An error occurred during API call.");
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {location?.pathname !== "/signin" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
          )}

          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              Sign in
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} />
            <AuthSocialButton icon={BsGoogle} />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {location?.pathname === "/signin"
              ? "New to Dashboard?"
              : "Already have an account?"}
          </div>
          <div
            className="underline cursor-pointer"
            onClick={() =>
              navigate(
                `${location?.pathname === "/signin" ? "/signup" : "/signin"}`
              )
            }
          >
            {location?.pathname === "/signin" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
