import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // EMPTY FIELD CHECK

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    // EMAIL VALIDATION

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Enter a valid email");
    }

    // PASSWORD VALIDATION

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4 py-6">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-xl p-5 sm:p-6">
        {/* HEADING */}

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h1>

        {/* FORM */}

        <form onSubmit={handleRegister}>
          {/* NAME */}

          <div className="mb-4">
            <label className="block text-base font-semibold mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none"
            />
          </div>

          {/* EMAIL */}

          <div className="mb-4">
            <label className="block text-base font-semibold mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none"
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-4">
            <label className="block text-base font-semibold mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ROLE */}

          <div className="mb-5">
            <label className="block text-base font-semibold mb-1">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none"
            >
              <option value="user">User</option>

              <option value="admin">Admin</option>
            </select>
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-xl text-base font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>

          {/* FOOTER */}

          <p className="text-center mt-5 text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-2 font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
