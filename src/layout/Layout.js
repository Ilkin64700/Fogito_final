import React, { useState } from "react";
import Navbar from "./Navbar";
import LeftDrawer from "./LeftDrawer";

const Layout = ({ children }) => {
const [opensidebar, setOpenSideBar] = useState(false)
  return (
    <>
      <LeftDrawer opensidebar={opensidebar} setOpenSideBar={setOpenSideBar} />
      <Navbar opensidebar={opensidebar} setOpenSideBar={setOpenSideBar} />
      <main style={{ marginLeft: opensidebar ? "300px" : "" }}>{children}</main>
    </>
  );
};

export default Layout;
