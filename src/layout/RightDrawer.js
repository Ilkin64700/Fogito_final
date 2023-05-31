import React, { useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { RiPaintBrushFill } from "react-icons/ri";

const RightDrawer = ({ closeCart, hideLightbox }) => {

    const colors=[{
        icon:<RiPaintBrushFill className="paint-icons text-primary" />,
        color:" Blue"
    },{
        icon:<RiPaintBrushFill className="paint-icons text-danger" />,
        color:" Red"
    },{
        icon:<RiPaintBrushFill className="paint-icons text-info" />,
        color:" Cyan"
    },{
        icon:<RiPaintBrushFill className="paint-icons text-success" />,
        color:" Green"
    },{
        icon:<RiPaintBrushFill className="paint-icons text-warning" />,
        color:" Orange"
    },]

    const[colorindex,setColorIndex]=useState(-1)

  return (
    <div onClick={() => closeCart()} className="cart-overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`cart-container lightbox ${
          hideLightbox ? "hide-lightbox" : ""
        }`}
      >
        <div className="cart-header">
          <h4>Theme settings</h4>
          <a onClick={() => closeCart()}>
            <AiOutlineCloseSquare className="closebutton" />
          </a>
        </div>
        <div className="allmoods">
          <div className="choosingmood">Choose mood</div>
          <div className="lightdarkmoods">
            <div className="lightmood">
              <span></span>
              Light
            </div>
            <div className="darkmood">
              <span></span>
              Dark
            </div>
          </div>
        </div>
        <div className="allmoods pt-4">
          <div className="choosingmood">Choose color</div>
          <div className="lightdarkmoods">
            <ul>
            {colors.map((item,index)=>(
                <li className={`${colorindex===index ? "bgcolor" :""}`} onClick={()=>{setColorIndex(index)}}>
                    {item.icon}
                    {item.color}
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
