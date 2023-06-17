import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ThemeContext } from "../../context/ThemeProvider";

const RightDrawer = ({ opendrawer,setOpenDrawer, hideLightbox }) => {

    const [basketproductitems, setBasketProductItems] = useState([]);

    
  useEffect(() => {
    const basketproducts=JSON.parse(localStorage.getItem("basket"))
    if(basketproducts){
     setBasketProductItems(basketproducts)
    }
   }, [])
 

  return (
    <div onClick={() => setOpenDrawer()}  className="cart-overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`cart-container lightbox ${
          hideLightbox ? "hide-lightbox" : ""
        }`}
      >
        <div className="cart-header">
          <h4 >Product Basket</h4>
          <a onClick={() => setOpenDrawer()}>
            <AiOutlineCloseSquare className="closebutton" />
          </a>
        </div>
        <div>
        <h2>Checkout</h2>
        <div className="cardlist">
          {basketproductitems?.map((item, index) => (
            <div className="card">
              <img
                src={item.image}
                width="100px"
                height="100px"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default RightDrawer;



