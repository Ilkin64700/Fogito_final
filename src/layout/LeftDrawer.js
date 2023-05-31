import React, { useState } from "react";
import SeniorLogoSvg from "../assets/SVGs/SeniorLogo";
import { HiOutlineSquares2X2, HiChartBar } from "react-icons//hi2";
import { RiFileUserLine } from "react-icons/ri";
import { LuBox } from "react-icons/lu";

const LeftDrawer = ({opensidebar,setOpenSideBar}) => {
  const sidebarnavs = [
    {
      icon: <HiOutlineSquares2X2 className="icon-sidebar" />,
      navname: "Dashboard",
    },
    {
      icon: <RiFileUserLine className="icon-sidebar" />,
      navname: "Customers",
    },
    {
      icon: <LuBox className="icon-sidebar" />,
      navname: "Products",
    },
    {
      icon: <HiChartBar className="icon-sidebar" />,
      navname: "Statistics",
    },
  ];

  const [selectednav, setSelectedNav] = useState(-1);

  return (
    <section
      style={{ width: opensidebar ? "250px" : "50px" }}
      className="sidebar"
    >
      <div className="upper-part">
        <div
          style={{ display: opensidebar ? "block" : "none" }}
          className="logo"
        >
          <SeniorLogoSvg />
        </div>
        <div
          style={{ paddingLeft: opensidebar ? "15px" : "0px" }}
          className="three-lines"
        >
          <i  style={{ display: opensidebar ? "block" : "none" }}
            onClick={() => {
              setOpenSideBar(!opensidebar);
            }}
            class="bi bi-list-nested"
          ></i>
          <i  style={{ display: opensidebar ? "none" : "block" }}
            onClick={() => {
              setOpenSideBar(!opensidebar);
            }} class="bi bi-list"></i>
        </div>
      </div>
      <div className="sidebar-navigation">
        <ul style={{ paddingLeft: opensidebar ? "2rem" : "15px" }}>
          {sidebarnavs.map((item, index) => (
            <li
              onClick={() => {
                setSelectedNav(index);
              }}
              className={`${selectednav === index ? "setnavcolor" : ""}`}
            >
              <a>{item.icon}</a>
              <a  style={{ display: opensidebar ? "block" : "none" }} >{item.navname}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LeftDrawer;
