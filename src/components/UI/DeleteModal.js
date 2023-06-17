import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Info = ({
  selecteditem,
  setSelectedItem,
  opendeletemodal,
  setOpenDeleteModal,
  currentUserData,
  setCurrentUserData

}) => {

  const deletebyid = (id) => {
    const newlist = currentUserData.filter((item) => item.id !== id);
    setCurrentUserData(newlist);
  };
  
  return (
    <div
      onClick={() => {
        setOpenDeleteModal(!opendeletemodal);
      }}
      className="addmodal-overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="addmodal adddeletemodal"
      >
        <div className="modalheader">
          <div className="modaltext">Delete Confirmation</div>
          <div className="modalicon">
            <IoCloseSharp
              onClick={() => {
                setOpenDeleteModal(!opendeletemodal);
              }}
              className="closeicon"
            />
          </div>
        </div>
        <div className="formcontent">
          <div className="modalbody">Are you sure want to delete?</div>
          <div className="deletecancelbuttons">
            <button
              onClick={() => {
                setOpenDeleteModal(!opendeletemodal);
              }}
              className="savebuttons"
            >
              Cancel
            </button>
            <button
             onClick={()=>{deletebyid(selecteditem.id);
            setOpenDeleteModal(false)
            }}
              className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
