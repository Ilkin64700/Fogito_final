import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ThemeContext } from "../../context/ThemeProvider";

const RightDrawer = ({ opendrawer, setOpenDrawer, hideLightbox }) => {
  const [basketproductitems, setBasketProductItems] = useState([]);

  useEffect(() => {
    const basketproducts = JSON.parse(localStorage.getItem("basket"));
    if (basketproducts) {
      setBasketProductItems(basketproducts);
    }
  }, []);

  return (
    <div onClick={() => setOpenDrawer()} className="cart-overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`cart-container lightbox ${
          hideLightbox ? "hide-lightbox" : ""
        }`}
      >
        <div className="cart-header">
          <h4>Basket</h4>
          <a onClick={() => setOpenDrawer()}>
            <AiOutlineCloseSquare className="closebutton" />
          </a>
        </div>
        <div>
          <div className="cardlist">
            {basketproductitems?.map((item, index) => (
              <div className="card">
                <img
                  src={item.image}
                  height="110px"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-title">{item.title}</p>
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
