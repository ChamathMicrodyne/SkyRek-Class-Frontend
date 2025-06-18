import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { mediaUpload } from "../utils/mediaUpload";

function SignupPage() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("https://avatar.iran.liara.run/public/boy?username=Ash");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [image, setImage] = useState("https://avatar.iran.liara.run/public/boy?username=Ash");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file)
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function fileUpload() {
    try {
      const res = await mediaUpload(selectedImageFile);
      return res;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  

  async function handleLogin() {
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      let imageUrl = image;

      if (selectedImageFile) {
        try {
          imageUrl = await fileUpload(); // ✅ wait for upload
        } catch (uploadError) {
          toast.error("Image upload failed");
          return;
        }
      }

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/signup",
        {
          image: imageUrl,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );
      toast.success("Login Successful");
      navigate("/login")
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <div className='w-full h-screen bg-[url("/LoginBackground.png")] bg-cover bg-center flex flex-col justify-center items-center'>
      <div className="bg-black/40 w-full h-full absolute top-0 flex justify-center items-center">
        <div className="w-[414px] bg-black/5 border-2 border-white/20 backdrop-blur-md text-white rounded-xl p-8 flex flex-col items-center justify-center space-y-5">
          <h2 className="text-3xl font-bold">Sign Up</h2>

          {/* Clickable Avatar Preview */}
          <div
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 cursor-pointer hover:opacity-80 transition"
          >
            <img
              src={imagePreview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hidden Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 placeholder-white text-white outline-none"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 placeholder-white text-white outline-none"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 placeholder-white text-white outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          {/* Password */}
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

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 placeholder-white text-white outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit */}
          <button
            className="bg-white text-black font-semibold rounded-full w-full py-3 hover:bg-gray-300 transition duration-300"
            onClick={handleLogin}
          >
            Sign Up
          </button>

          <p className="text-[13px] mt-[-5px] mb-[-5px] cursor-default">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
