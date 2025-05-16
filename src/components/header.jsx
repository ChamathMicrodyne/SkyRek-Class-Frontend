import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  return (
    <header className="w-full h-[80px] shadow-2xl flex">
      <img
        src="/Logo.png"
        alt="Logo"
        className="w-[80px] h-[80px] object-contain cursor-pointer"
        onClick={() => {
            navigate("/")
        }}
      />
      <div className="w-[calc(100%-160px)] h-full flex justify-center items-center">
        <Link to="/" className=" text-[20px] font-bold mx-2">Home</Link>
        <Link to="/products" className=" text-[20px] font-bold mx-2">Products</Link>
        <Link to="/about" className=" text-[20px] font-bold mx-2">About</Link>
        <Link to="/contact" className=" text-[20px] font-bold mx-2">Contact</Link>
      </div>
      <div className="w-[80px] h-full bg-green-400"></div>
    </header>
  );
}

export default Header;
