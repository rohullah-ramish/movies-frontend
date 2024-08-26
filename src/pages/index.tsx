import MainLayout from "@/layouts/MainLayout";
import { useLoginUserMutation } from "@/services/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await loginUser({ email, password }).unwrap();
      
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("refresh-token", result.refresh_token);
        toast.success('Login successfully')
        router.push("/movies");
      } else {
        // console.log("res", result.message);
        toast.error(result.message)
      }
    } catch (error:any) {
      toast.error(error.data.message)
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 h-full w-full flex flex-col items-center justify-center p-6 max-w-[300px] mx-auto">
        <h2 className="mb-8 font-montserrat font-semibold">Sign In</h2>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-3 items-center justify-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className="bg-primary font-bold"
            onClick={handleLogin}
            disabled={isLoading}
          >
            Login
          </button>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
}

export default Login;
