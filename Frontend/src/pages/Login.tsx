import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
        {/* HEADING */}

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">
          Welcome Back 👋
        </h1>

        {/* FORM */}

        <form onSubmit={handleLogin}>
          {/* EMAIL */}

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base outline-none"
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-5">
            <label className="block text-lg font-semibold mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition"
          >
            Log In
          </button>

          {/* FOOTER */}

          <p className="text-center mt-6 text-base">
            Don’t have an account?
            <Link to="/register" className="text-blue-600 ml-2 font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
