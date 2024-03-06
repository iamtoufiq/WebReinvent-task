import React, { useCallback, useEffect, useState } from "react";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Input from "./Input";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    console.log(data);
    try {
      if (location?.pathname !== "/signin") {
        const registrationData = {
          email: data?.email,
          password: data?.password,
        };
        const response = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          const responseBody = await response.json();
          console.error("Registration failed:", responseBody.error);
          toast.error(responseBody?.error);
        } else {
          const responseData = await response.json();
          toast.success("Registration successful!");
          navigate("/signin");
        }
      }

      if (location?.pathname === "/signin") {
        console.log("this is signin");
        // Implement your sign-in logic here
        const registrationData = {
          email: data?.email,
          password: data?.password,
        };
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });

        if (!response.ok) {
          const responseBody = await response.json();
          toast.error(responseBody?.error);
        } else {
          const responseData = await response.json();
          toast.success("Login successful!");
          sessionStorage.setItem("token", responseData.token);

          navigate("/");
        }
      }
    } catch (error) {
      // Handle error, e.g., show a toast notification
      toast.error("An error occurred during submission.");
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/users");
  //   }
  // }, [session?.status, router]);
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
