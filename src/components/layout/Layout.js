import React, { useState } from "react";
import Navbar from "./Navbar";
import LeftDrawer from "./LeftDrawer";

const Layout = ({ children }) => {
const[openleftdrawer,setOpenLeftDrawer]=useState(localStorage.getItem("closedleftdrawer") ? false : true)

  return (
    <>
      <LeftDrawer openleftdrawer={openleftdrawer} setOpenLeftDrawer={setOpenLeftDrawer} />
      <Navbar  openleftdrawer={openleftdrawer} setOpenLeftDrawer={setOpenLeftDrawer} />
      <main className="editmain" style={{ marginLeft: openleftdrawer ? "350px" : "120px" }}>{children}</main>
    </>
  );
};

export default Layout;
