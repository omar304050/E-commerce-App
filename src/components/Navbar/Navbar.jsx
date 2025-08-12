import React, { useContext, useState } from "react";
import "./Navbar.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ImageLogo from "../../assets/images/freshcart-logo.svg";
import { UserContxet } from "../../context/UserContext";
import { cartContext } from "../../context/CarContext";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const { cart } = useContext(cartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContxet);

  const userLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/brands", label: "Brands" },
  ];

  const guestLinks = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  const socialLinks = [
    { href: "#", iconClass: "fa-brands fa-instagram" },
    { href: "#", iconClass: "fa-brands fa-facebook" },
    { href: "#", iconClass: "fa-brands fa-tiktok" },
    { href: "#", iconClass: "fa-brands fa-twitter" },
    { href: "#", iconClass: "fa-brands fa-linkedin" },
  ];

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-gray-100 border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-col xl:flex-row lg:items-center gap-3 mx-auto p-4 relative">
        {/* الشعار وزر الهامبرغر (يظهر على الشاشات الصغيرة) */}
        <div className="flex justify-between items-center w-full md:flex-row md:justify-center md:w-auto ">
          <Link to="/">
            <img src={ImageLogo} alt="Logo" className="w-[144px] md:w-full" />
          </Link>
          <div className="md:hidden">
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
        </div>
        {/* القائمة الرئيسية:
              - على الشاشات الصغيرة تُعرض بناءً على حالة isMenuOpen.
              - على الشاشات المتوسطة وما فوق تظهر دائمًا بفضل md:flex */}
        <div
          className={`
      ${
        isMenuOpen
          ? "top-[50px] md:static duration-200"
          : "top-[-450px] md:static duration-500"
      } 
      md:flex md:gap-2 xl:justify-between md:justify-center w-full md:w-4/5 mx-auto absolute right-0 
    `}
          id="navbar-default"
        >
          {/* المجموعة الأولى */}
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {userLogin !== null &&
              userLinks.map(({ to, label }) => (
                <li key={to} >
                  <NavLink
                    onClick={() => setIsMenuOpen(false)}
                    to={to}
                    className="block mt-1 mb-1 rounded py-1 px-4  text-black"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
          </ul>

          {/* المجموعة الثانية */}
          <ul className="font-medium flex flex-col md:flex-row gap-5 items-center  p-4 md:p-0 md:ml-4 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:mt-0">
            {userLogin === null ? (
              guestLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    onClick={() => setIsMenuOpen(false)}
                    to={to}
                    className="block py-1 px-4"
                  >
                    {label}
                  </NavLink>
                </li>
              ))
            ) : (
              <div
                onClick={() => setIsMenuOpen(false)}
                className="flex  md:flex-row gap-3"
              >
                <li onClick={logOut}>
                  <span className="block py-2 md:p-0 cursor-pointer">
                    Logout
                  </span>
                </li>
              </div>
            )}

            {/* أيقونات السوشيال ميديا */}
            <li className="flex gap-6 items-center justify-center">
              {socialLinks.map(({ href, iconClass }, idx) => (
                <Link
                  key={idx}
                  to={href}
                  className="
        block py-2 md:p-0 text-green-600
        transition-transform duration-300 ease-in-out
        hover:scale-125 hover:text-pink-500
        hover:rotate-[15deg] hover:shadow-lg hover:shadow-pink-400/50
        active:scale-110 active:rotate-0
        "
                 
                >
                  <i className={`${iconClass} text-2xl`}></i>
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
