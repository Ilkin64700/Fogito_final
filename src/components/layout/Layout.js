import React, { useState } from "react";
import Navbar from "./Navbar";
import LeftDrawer from "./LeftDrawer";

const Layout = ({ children }) => {
const [opensidebar, setOpenSideBar] = useState(false)
  return (
    <>
      <LeftDrawer opensidebar={opensidebar} setOpenSideBar={setOpenSideBar} />
      <Navbar  opensidebar={opensidebar} setOpenSideBar={setOpenSideBar} />
      <main className="editmain" style={{ marginLeft: opensidebar ? "350px" : "120px" }}>{children}</main>
    </>
  );
};

export default Layout;
