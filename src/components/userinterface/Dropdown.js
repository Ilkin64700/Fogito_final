import React, { useContext, useEffect, useRef, useState } from "react";
import userphoto from "../../assets/images/user photo.jpg";
import { LangContext } from "../../context/LanguageProvider";

const Dropdown = ({
  image,
  circlearrowicon,
  dropdownleftposition,
  arr,
  span,
  whitespace,
  editpadding,
  nobutton
}) => {
  const {language,setLanguage,weblanguages} =useContext(LangContext)

  const [showDropdDown, setShowDropDown] = useState(false);

  const clickOutside = useRef(null);

  useEffect(() => {
    const closeOpenDropdown = (e) => {
      if (!clickOutside.current.contains(e.target)) {
        console.log("clicksidecurrent", clickOutside.current);
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", closeOpenDropdown);
  }, []);

  return (
    <>
      <div ref={clickOutside} className="dropdown">
        <div
          onClick={() => {
            setShowDropDown(!showDropdDown);
          }}
          className="dropdown-button"
        >
          <span className={`${span}`}>12</span>
          {circlearrowicon}
          <img
            className={image}
            width={50}
            height={50}
            src={userphoto}
            alt=""
          />
          <p className={image}>Ilkin Zamanli</p>
        </div>
        {showDropdDown && (
          <div className={`dropdown-content ${dropdownleftposition}`}>
            {arr.map((item, index) => (
              <div
                onClick={() => {
                  setShowDropDown(false);
                  setLanguage(setLanguage===item.language ? item.language : setLanguage)

                }}
                className="dropdown-item"
              >
                {item.icon}
                <p className={editpadding}>
                  {item.content}
                  {item.language}
                </p>
              </div>
            ))}
            <button className={`btn btn-primary ${nobutton}`}>View All</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
