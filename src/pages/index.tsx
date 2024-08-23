import MainLayout from "@/layouts/MainLayout";
import { useLoginUserMutation } from "@/services/auth";
import { useRouter } from "next/router";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await loginUser({ email, password }).unwrap();
      console.log("Login successful:", result);
      
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("refresh-token", result.refresh_token);
        router.push("/movies");
      } else {
        console.log("res", result.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
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
    </MainLayout>
  );
}

export default Login;
