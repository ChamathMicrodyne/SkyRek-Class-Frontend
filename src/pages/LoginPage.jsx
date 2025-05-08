import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      toast.success("Login Successful");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if (response.data.role == "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className='w-full h-screen bg-[url("/LoginBackground.png")] bg-cover bg-center flex flex-col justify-center items-center'>
      <div className="bg-black/40 w-full h-full absolute top-0 flex justify-center items-center">
        <div className="w-[414px] h-[400px] bg-black/5 border-2 border-white/20 backdrop-blur-md text-white rounded-xl p-8 flex flex-col items-center justify-center space-y-8">
          <h2 className="text-4xl font-bold">Login</h2>

          <div className="w-full flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 space-x-3">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent text-white w-full outline-none placeholder-white"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div className="w-full flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 space-x-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent text-white w-full outline-none placeholder-white"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setShowPassword(!showPassword)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c1.104 0 2 .896 2 2v1H10v-1c0-1.104.896-2 2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8V7a5 5 0 00-10 0v1m12 4v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5h14z"
              />
            </svg>
          </div>

          <button
            type="submit"
            className="bg-white text-black font-semibold rounded-full w-full py-3 hover:bg-gray-300 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-[13px] mt-[-15px] mb-[-20px] cursor-default">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
