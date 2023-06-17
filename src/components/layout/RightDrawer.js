import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ThemeContext } from "../../context/ThemeProvider";

const RightDrawer = ({ closeCart, hideLightbox }) => {


  const {theme,setTheme,paintcolor,setPaintColor,colors}=useContext(ThemeContext)

  const [colorindex, setColorIndex] = useState(-1);

  useEffect(() => {
  document.body.style.color=paintcolor
  }, [paintcolor])

  

  const changeLightTheme = () => {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    setTheme("light");
  };

  const changeDarkTheme = () => {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    setTheme("dark");
  };

  useEffect(() => {
    localStorage.setItem("themechoice", theme);
  }, [theme]);

  return (
    <div onClick={() => closeCart()} style={{color:paintcolor? "black" :""}}  className="cart-overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`cart-container lightbox ${
          hideLightbox ? "hide-lightbox" : ""
        }`}
      >
        <div className="cart-header">
          <h4 >Theme settings</h4>
          <a onClick={() => closeCart()}>
            <AiOutlineCloseSquare className="closebutton" />
          </a>
        </div>
        <div className="allmoods">
          <div className="choosingmood">Choose mood</div>
          <div className="lightdarkmoods">
            <div onClick={()=>{changeLightTheme()}} className={`lightmood ${theme==="light" ? "activetheme" :""}`}>
              <span></span>
             <p>Light</p>
            </div>
            <div onClick={()=>{changeDarkTheme()}}  className={`darkmood ${theme==="dark" ? "activetheme" :""}`}>
              <span></span>
           <p>Dark</p>
            </div>
          </div>
        </div>
        <div className="allmoods pt-4">
          <div className="choosingmood">Choose color</div>
          <div className="lightdarkmoods">
            <ul>
              {colors.map((item, index) => (
                <li
                key={item.code}
                  className={`${colorindex === index ? "bgcolor" : ""}`}
                  onClick={() => {
                    setColorIndex(index);
                    setPaintColor(item.code)

                  }}
                >
                  {item.icon}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightDrawer;
