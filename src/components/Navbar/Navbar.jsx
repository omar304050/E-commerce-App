import React, { useContext, useState } from 'react';
import './Navbar.module.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import ImageLogo from '../../assets/images/freshcart-logo.svg';
import { UserContxet } from '../../context/UserContext';
import { cartContext } from '../../context/CarContext';
import Hamburger from 'hamburger-react';

export default function Navbar() {
  const { cart } = useContext(cartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(UserContxet);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate('/login');
  }

  return (
    <nav className="bg-gray-100 border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-col xl:flex-row lg:items-center gap-3 mx-auto p-4">
        {/* الشعار وزر الهامبرغر (يظهر على الشاشات الصغيرة) */}
        <div className="flex justify-between w-full md:flex-row md:justify-center md:w-auto">
          <Link to="/">
            <img src={ImageLogo} alt="Logo" />
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
            ${isMenuOpen ? "block" : "hidden"} 
            md:flex md:gap-2 xl:justify-between md:justify-center w-full md:w-4/5 mx-auto
          `}
          id="navbar-default"
        >
          {/* المجموعة الأولى: روابط المستخدم (Home, Products, Categories, Brands) */}
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {userLogin !== null && (
              <>
                <li>
                  <NavLink onClick={()=>setIsMenuOpen(false)} to="/" className="block py-2 rounded md:p-0 text-black">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setIsMenuOpen(false)} to="/products" className="block py-2 rounded md:p-0 text-black">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setIsMenuOpen(false)} to="/categories" className="block py-2 rounded md:p-0 text-black">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setIsMenuOpen(false)} to="/brands" className="block py-2 rounded md:p-0 text-black">
                    Brands
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* المجموعة الثانية: روابط الدخول/التسجيل/الخروج وعربة التسوق */}
          <ul className="font-medium flex flex-col p-4 md:p-0 md:ml-4 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {userLogin === null ? (
              <>
                <li>
                  <NavLink onClick={()=>setIsMenuOpen(false)} to="/login" className="block py-2 md:p-0">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={()=>setIsMenuOpen(false)} to="/register" className="block py-2 md:p-0">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <div onClick={()=>setIsMenuOpen(false)} className="flex flex-col md:flex-row gap-3">
                <li onClick={logOut}>
                  <span className="block py-2 md:p-0 cursor-pointer">
                    Logout
                  </span>
                </li>
                <li>
                  <Link onClick={()=>setIsMenuOpen(false)} to="/cart" className="block py-2 md:p-0">
                    <div className="relative">
                      {cart?.numOfCartItems && (
                        <span className="absolute h-7 w-7 flex justify-center items-center bottom-1/2 left-3 bg-green-400 rounded-full py-0.5 px-1.5 text-white">
                          {cart?.numOfCartItems}
                        </span>
                      )}
                      <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                  </Link>
                </li>
              </div>
            )}
            {/* مجموعة أيقونات وسائل التواصل الاجتماعي */}
            <li className="flex gap-5 items-center justify-center">
              <Link className="block py-2 md:p-0">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link className="block py-2 md:p-0">
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link className="block py-2 md:p-0">
                <i className="fa-brands fa-tiktok"></i>
              </Link>
              <Link className="block py-2 md:p-0">
                <i className="fa-brands fa-twitter"></i>
              </Link>
              <Link className="block py-2 md:p-0">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
