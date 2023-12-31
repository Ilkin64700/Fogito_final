import React, { useContext, useState } from "react";
import Dropdown from "../../components/UI/Dropdown";
import { BsBell } from "react-icons/bs";
import { BiError, BiPalette, BiUser, BiWalletAlt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { TbFlag3Filled } from "react-icons/tb";
import { LuBox, LuShoppingCart, LuArrowUpLeftFromCircle } from "react-icons/lu";
import RightDrawer from "../layout/RightDrawer";
import { ThemeContext } from "../../context/ThemeProvider";

const Navbar = ({ openleftdrawer, setOpenLeftDrawer }) => {
  const usermenus = [
    {
      icon: <BiUser className="usermenu-icons" />,
      content: "Profile",
    },
    {
      icon: <BiWalletAlt className="usermenu-icons" />,
      content: "My Wallet",
    },
    {
      icon: <FiSettings className="usermenu-icons" />,
      content: "Settings",
    },
    {
      icon: <AiOutlineLogout className="usermenu-icons" />,
      content: "Logout",
    },
  ];
  const languages = [
    {
      code: "eng",
      icon: <TbFlag3Filled className="language-icons" />,
      language: "English",
    },
    {
      code: "aze",
      icon: <TbFlag3Filled className="language-icons" />,
      language: "Azerbaijani",
    },
    {
      code: "tur",
      icon: <TbFlag3Filled className="language-icons" />,
      language: "Turkish",
    },
  ];

  const notifications = [
    {
      icon: <BiError className="notifications-icons" />,
      content: "Curabitur id eros quis nunc suscipit blandit",
    },
    {
      icon: <LuBox className="notifications-icons" />,
      content:
        "Duis malesuada justo eu sapien elementum, in semper diam posuere",
    },
    {
      icon: <LuShoppingCart className="notifications-icons" />,
      content: "Donec at nisi sit amet tortor commodo porttitor pretium a erat",
    },
    {
      icon: <BiError className="notifications-icons" />,
      content: "In gravida mauris et nisi",
    },
    {
      icon: <LuShoppingCart className="notifications-icons" />,
      content: "Curabitur id eros quis nunc suscipit blandit",
    },
  ];

  const {paintcolor}=useContext(ThemeContext)




  const [openCart, setOpenCart] = useState(false);

  return (
    <div
      style={{ marginLeft: openleftdrawer ? "350px" : "" }}
      className="customnavbar"
    >
      <div className="onedropdown">
        <Dropdown
          nobutton="nobutton"
          span="nonespan"
          arr={usermenus}
          dropdownleftposition="dropdownleftpositionone"
        />
      </div>
      <div className="threedropdown">
        <Dropdown
          nobutton="nobutton"
          span="nonespan"
          arr={languages}
          image="noneimageparagraph"
          circlearrowicon={
            <LuArrowUpLeftFromCircle className="editdropdownicon" />
          }
          dropdownleftposition="dropdownleftpositiontwo"
        />
        <Dropdown
          editpadding="editpadding"
          arr={notifications}
          image="noneimageparagraph"
          circlearrowicon={<BsBell className="editdropdownicon" />}
          dropdownleftposition="dropdownleftpositionthree"
        />
        <button
          onClick={() => {
            setOpenCart(!openCart);
          }}
          className="btn palette"
        >
          <BiPalette className={`draweroutsidebutton ${paintcolor}`} />
        </button>
      </div>
      {openCart ? <RightDrawer closeCart={setOpenCart} /> : null}
    </div>
  );
};

export default Navbar;
