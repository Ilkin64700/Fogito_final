import React, { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiPencilFill } from "react-icons/ri";

const Info = ({ showmodal, setShowModal, selecteditem, setSelectedItem }) => {
  // const navigate=useNavigate();
  const [enabled, setEnabled] = useState(true);
  const editInput = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      onClick={() => {
        setShowModal(!showmodal);
      }}
      className="addmodal-overlay"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="addmodal"
      >
        <div className="modalheader">
          <div className="modalicon">
            <button
              onClick={() => {
                setShowModal(!showmodal);
              }}
              className="btn btn-success"
            >
              <RiArrowLeftSLine className="closeicon" />
            </button>
          </div>
          <div className="modaltext">Info</div>
          <div>
            <button
              onClick={() => {
                setShowModal(!showmodal);
              }}
              className="btn btn-success"
            >
              Save
            </button>
          </div>
        </div>
        <div className="formcontent">
          <div className="showblock">
            <label>Id:</label>
            <input
              disabled={enabled}
              name="id"
              value={selecteditem.id}
              onChange={editInput}
              type="number"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="showblock">
            <label>Name:</label>
            <input
              disabled={enabled}
              name="name"
              value={selecteditem.name}
              onChange={editInput}
              type="text"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="showblock">
            <label>Email:</label>
            <input
              disabled={enabled}
              name="email"
              value={selecteditem.email}
              onChange={editInput}
              type="text"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="product-rate showblock">
            <label>Locations:</label>
            <input
              disabled={enabled}
              name="location"
              value={selecteditem.location}
              onChange={editInput}
              type="text"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="product-count showblock">
            <label>Phone:</label>
            <input
              disabled={enabled}
              name="phone"
              value={selecteditem.phone}
              onChange={editInput}
              type="text"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="product-count showblock">
            <label>Total_Expenses:</label>
            <input
              disabled={enabled}
              name="total_spend"
              value={selecteditem.total_spend}
              onChange={editInput}
              type="text"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="product-count showblock">
            <label>Total_Orders:</label>
            <input
              disabled={enabled}
              name="total_orders"
              value={selecteditem.total_orders}
              onChange={editInput}
              type="number"
            />
            <div
              onClick={() => setEnabled(!enabled)}
              className="modal-editicon"
            >
              Edit
              <RiPencilFill className="icon-pencil" />
            </div>
          </div>
          <div className="closebutton">
            <button
              onClick={() => {
                setShowModal(!showmodal);
              }}
              className="btn btn-danger"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
