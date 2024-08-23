import MainLayout from "@/layouts/MainLayout";

function Login() {
  return (
    <MainLayout>
      <div className="flex-1 h-full w-full flex flex-col items-center justify-center p-6 max-w-[300px] mx-auto">
        <h2 className="mb-8 font-montserrat font-semibold">Sign In</h2>
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="flex gap-3 items-center justify-center">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="bg-primary font-bold">Login</button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
