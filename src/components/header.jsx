import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  return (
    <header className="w-full h-[80px] shadow-2xl flex">
      <img
        src="/Logo.png"
        alt="Logo"
        className="w-[80px] h-[80px] object-contain cursor-pointer ml-3"
        onClick={() => {
          navigate("/");
          setActive("home");
        }}
      />
      <div className="w-[calc(100%-160px)] h-full flex justify-center items-center space-x-4">
        {[
          { name: "Home", path: "/", id: "home" },
          { name: "Products", path: "/products", id: "products" },
          { name: "About", path: "/about", id: "about" },
          { name: "Contact", path: "/contact", id: "contact" },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative group cursor-pointer px-2"
          >
            <Link
              to={item.path}
              className={`text-[20px] font-bold transition-colors duration-300 ${
                active === item.id ? "text-black" : "text-gray-800"
              }`}
            >
              {item.name}
            </Link>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-pink-500 transition-all duration-300 ${
                active === item.id ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="w-[80px] h-full bg-green-400"></div>
    </header>
  );
}

export default Header;
