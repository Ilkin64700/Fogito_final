import React, { useContext, useState } from "react";
import SeniorLogoSvg from "../../assets/SVGs/SeniorLogo";
import { HiOutlineSquares2X2, HiChartBar } from "react-icons//hi2";
import { RiFileUserLine } from "react-icons/ri";
import { LuBox } from "react-icons/lu";
import { LangContext } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeProvider";
import { Link } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Customers from "../../pages/customers/Customers";

const LeftDrawer = ({opensidebar,setOpenSideBar}) => {

  const { language, weblanguages } = useContext(LangContext);



  const sidebarnavs = [
    {
      icon: <HiOutlineSquares2X2 className="icon-sidebar" />,
      navname: weblanguages[language]?.dashboard,
      path:"/dashboard",
      element:<Dashboard/>
    },
    {
      icon: <RiFileUserLine className="icon-sidebar" />,
      navname: weblanguages[language]?.customers,
      path: "/customers",
      element: <Customers />,
    },
    {
      icon: <LuBox className="icon-sidebar" />,
      navname:weblanguages[language]?.products
    },
    {
      icon: <HiChartBar className="icon-sidebar" />,
      navname: weblanguages[language]?.statistics
    },
  ];
  const {theme,paintcolor}=useContext(ThemeContext)


  const [selectednav, setSelectedNav] = useState(0);

  const style1={display: opensidebar ? "block" : "none"}
  const style2={color:paintcolor? paintcolor : ""}
  const style3={ display: opensidebar ? "none" : "block"}



  return (
    <section
      style={{ width: opensidebar ? "300px" : "50px" }}
      className="sidebar"
    >
      <div className="upper-part">
        <div
          style={{ display: opensidebar ? "block" : "none" }}
          className="logo"
        >
          <SeniorLogoSvg theme={theme} />
        </div>
        <div
          style={{ paddingLeft: opensidebar ? "15px" : "0px" }}
          className="three-lines"
        >
          <i  style={{ ...style1,...style2}}
            onClick={() => {
              setOpenSideBar(!opensidebar);
            }}
            className="bi bi-list-nested"
          ></i>
          <i  style={{ ...style3,...style2}}
            onClick={() => {
              setOpenSideBar(!opensidebar);
            }} className="bi bi-list"></i>
        </div>
      </div>
      <div style={{color:paintcolor ? "black" : ""}} className="sidebar-navigation">
        <ul style={{ paddingLeft: opensidebar ? "2rem" : "15px" }}>
          {sidebarnavs.map((item, index) => (
            <li
              onClick={() => {
                setSelectedNav(index);
              }}
              className={`${selectednav === index ? paintcolor : ""}`}
            >
              <Link to={item.path}>{item.icon}</Link>
              <Link to={item.path} style={{ display: opensidebar ? "block" : "none" }} >{item.navname}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LeftDrawer;
