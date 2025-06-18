import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function sendOtp() {
    if (!email) {
      toast.error("Email is required")
      return
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp", {
        email: email,
      })
      .then((response) => {
        setOtpSent(true);
        toast.success("OTP sent to your email check your inbox");
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      });
  }

  function verifyOtp() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const otpInNumber = parseInt(otp, 10);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
        email: email,
        otp: otpInNumber,
        newPassword: newPassword,
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Invalid OTP");
      });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('/LoginBackground.png')] bg-center bg-cover">
      {otpSent ? (
        <div className='w-full h-screen bg-[url("/LoginBackground.png")] bg-cover bg-center flex flex-col justify-center items-center'>
          <div className="bg-black/40 w-full h-full absolute top-0 flex justify-center items-center">
            <div className="w-[414px] h-[500px] bg-black/5 border-2 border-white/20 backdrop-blur-md text-white rounded-xl p-8 flex flex-col items-center justify-center space-y-8">
              <h2 className="text-4xl font-bold">Reset Password</h2>

              <div className="w-full flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 space-x-3">
                <input
                  type="number"
                  placeholder="Enter your OTP"
                  className="bg-transparent text-white w-full outline-none placeholder-white"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  value={otp}
                />
              </div>
              <div className="w-full flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 space-x-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent text-white w-full outline-none placeholder-white"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  value={newPassword}
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
              <div className="w-full flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-transparent text-white w-full outline-none placeholder-white"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  value={confirmPassword}
                />
              </div>
              <p
                className="text-[13px] underline text-blue-500 mt-[-23px] mr-[-250px] cursor-pointer"
                onClick={() => setOtpSent(false)}
              >
                Resend OTP
              </p>
              <button
                type="submit"
                className="bg-white text-black font-semibold rounded-full w-full py-3 hover:bg-gray-300 transition duration-300 cursor-pointer"
                onClick={() => {
                  verifyOtp();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-screen bg-[url("/LoginBackground.png")] bg-cover bg-center flex flex-col justify-center items-center'>
          <div className="bg-black/40 w-full h-full absolute top-0 flex justify-center items-center">
            <div className="w-[414px] h-[400px] bg-black/5 border-2 border-white/20 backdrop-blur-md text-white rounded-xl p-8 flex flex-col items-center justify-center space-y-8">
              <h2 className="text-4xl font-bold">Forget Password</h2>
              <div className="w-full flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
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
              <button
                type="submit"
                className="bg-white text-black font-semibold rounded-full w-full py-3 hover:bg-gray-300 transition duration-300 cursor-pointer"
                onClick={() => {
                  sendOtp();
                }}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
