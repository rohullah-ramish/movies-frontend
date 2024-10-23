import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useLoginUserMutation } from "../services/auth";
import MainLayout from "@/layouts/MainLayout";

type LoginFormInputs = {
  email: string;
  password: string;
};

function Login() {
  const [remember, setRemember] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  // Set up form validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const result = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("refresh-token", result.refresh_token);
        toast.success("Login successfully");
        router.push("/movies");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 h-full w-full flex flex-col items-center justify-center p-6 max-w-[300px] mx-auto">
        <h2 className="mb-8 font-montserrat font-semibold">Sign In</h2>
        <form
          onSubmit={handleSubmit(handleLogin)} 
          className="w-full flex flex-col justify-center items-center gap-6"
        >
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              onBlur={() => trigger("email")}
              className={`w-full p-2 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              onBlur={() => trigger("password")}
              className={`w-full p-2 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex gap-3 items-center justify-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me" className="font-light">Remember me</label>
          </div>

          <button
            type="submit"
            className="bg-primary font-bold"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <Toaster />
    </MainLayout>
  );
}

export default Login;
