import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const [active, setActive] = useState(null);

  const navLinks = [
    { name: "Home", path: "/", id: "home" },
    { name: "Products", path: "/products", id: "products" },
    { name: "About", path: "/about", id: "about" },
    { name: "Contact", path: "/contact", id: "contact" },
  ];

  return (
    <header className="w-full h-[80px] shadow-2xl flex justify-center relative bg-white z-50">
      {/* Mobile Menu Icon */}
      <GiHamburgerMenu
        className="h-full mx-2 text-3xl md:hidden absolute left-2 cursor-pointer"
        onClick={() => setSideDrawerOpened(true)}
      />

      {/* Logo */}
      <img
        src="/Logo.png"
        alt="Logo"
        className="w-[80px] h-[80px] object-contain cursor-pointer ml-3"
        onClick={() => {
          navigate("/");
          setActive("home");
        }}
      />

      {/* Desktop Nav Links */}
      <div className="w-[calc(100%-160px)] h-full justify-center items-center space-x-4 hidden md:flex">
        {navLinks.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative group cursor-pointer px-2"
          >
            <Link
              to={item.path}
              className={`text-[20px] font-bold transition-colors duration-300 ${
                active === item.id ? "text-black" : "text-gray-600"
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

      {/* Desktop Cart Icon */}
      <div className="w-[80px] h-full hidden md:flex justify-center items-center">
        <Link
          to="/cart"
          className="text-[20px] font-bold mx-2"
          onClick={() => setActive(null)}
        >
          <BsCart3 />
        </Link>
      </div>

      {/* Side Drawer */}
      {sideDrawerOpened && (
        <div className="fixed inset-0 bg-[#00000060] bg-opacity-50 z-40 md:hidden flex">
          <div className="w-[280px] bg-white h-full p-6 flex flex-col relative">
            <GiHamburgerMenu
              className="text-3xl absolute top-4 right-4 cursor-pointer"
              onClick={() => setSideDrawerOpened(false)}
            />
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-[60px] h-[60px] object-contain mb-6"
              onClick={() => {
                navigate("/");
                setActive("home");
                setSideDrawerOpened(false);
              }}
            />
            <nav className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActive(item.id);
                    setSideDrawerOpened(false);
                  }}
                  className={`text-xl font-semibold transition-colors ${
                    active === item.id ? "text-pink-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <Link
              to="/cart"
              onClick={() => {
                setSideDrawerOpened(false);
                setActive(null);
              }}
              className="mt-auto pt-6 border-t text-lg text-gray-800 flex items-center gap-2"
            >
              <BsCart3 className="text-2xl" />
              Cart
            </Link>
          </div>
          <div
            className="flex-1"
            onClick={() => setSideDrawerOpened(false)}
          ></div>
        </div>
      )}
    </header>
  );
}

export default Header;
