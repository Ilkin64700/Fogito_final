import React, { useContext, useEffect, useState } from "react";
import SeniorLogoSvg from "../../assets/SVGs/SeniorLogo";
import { HiOutlineSquares2X2, HiChartBar } from "react-icons//hi2";
import { RiFileUserLine } from "react-icons/ri";
import { LuBox } from "react-icons/lu";
import { LangContext } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeProvider";
import { NavLink } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Customers from "../../pages/customers/Customers";
import Products from "../../pages/products/Products";
import Statistics from "../../pages/statistics/Statistics";

const LeftDrawer = ({openleftdrawer,setOpenLeftDrawer }) => {
  const { language, weblanguages } = useContext(LangContext);

  const sidebarnavs = [
    {
      icon: <HiOutlineSquares2X2 className="icon-sidebar" />,
      navname: weblanguages[language]?.dashboard,
      path: "/",
      element: <Dashboard />,
    },
    {
      icon: <RiFileUserLine className="icon-sidebar" />,
      navname: weblanguages[language]?.customers,
      path: "/customers",
      element: <Customers />,
    },
    {
      icon: <LuBox className="icon-sidebar" />,
      navname: weblanguages[language]?.products,
      path: "/products",
      element: <Products />,
    },
    {
      icon: <HiChartBar className="icon-sidebar" />,
      navname: weblanguages[language]?.statistics,
      path: "/statistics",
      element: <Statistics />,
    },
  ];

  const { theme, paintcolor } = useContext(ThemeContext);

  const [selectednav, setSelectedNav] = useState(0);


  const sidebaropenclose=()=>{
    if (openleftdrawer) {
      setOpenLeftDrawer(false)
      localStorage.setItem("closedleftdrawer",true)
      return;
    }
    setOpenLeftDrawer(true)
    localStorage.removeItem("closedleftdrawer")
  }

  useEffect(() => {
    const savepaths = JSON.parse(localStorage.getItem("routepath"));
    if (savepaths) {
      setSelectedNav(parseInt(savepaths, 10));
    }
  }, []);

  return (
    <section
      style={{ width: openleftdrawer ? "300px" : "50px" }}
      className="sidebar"
    >
      <div className="upper-part">
        <div
          style={{ display: openleftdrawer ? "none" : "block" }}
          className="logo"
        >
          <i
            onClick={() => {
              sidebaropenclose();
            }}
            className={` ${paintcolor} bi bi-list `}
          ></i>
        </div>
        <div
          style={{ display: openleftdrawer ? "flex" : "none" }}
          className="three-lines"
        >
          <SeniorLogoSvg theme={theme} />
          <i
            onClick={() => {
              sidebaropenclose();
            }}
            className={` ${paintcolor} bi bi-list-nested `}
          ></i>
        </div>
      </div>
      <div
        style={{ color: paintcolor ? "black" : "" }}
        className="sidebar-navigation"
      >
        <ul>
          {sidebarnavs.map((item, index) => (
            <li
              onClick={() => {
                setSelectedNav(index);
                localStorage.setItem("routepath", JSON.stringify(index));
                
              }}
            >
              <NavLink
                className={`${selectednav === index ? "setnavcolor" : ""}`}
                to={item.path}
              >
                <div className={`${selectednav === index ? "setnavcolor" : ""} navlink ${paintcolor}`}>
                  <div>{item.icon}</div>
                  <div style={{ display: openleftdrawer ? "block" : "none" }}>
                    {item.navname}
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LeftDrawer;
