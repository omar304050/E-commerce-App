import "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContxet } from "../../context/UserContext";

export default function Layout() {
  const {userLogin} = useContext(UserContxet)
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="  myContainer py-6  ">
          <Outlet></Outlet>
        </div>
        {userLogin ? <Footer /> : ""}
      </div>
    </>
  );
}
