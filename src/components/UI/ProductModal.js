import React, {useState } from "react";
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
            <label>Title:</label>
            <input
              disabled={enabled}
              name="title"
              value={selecteditem.title}
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
            <label>Price:</label>
            <input
              disabled={enabled}
              name="price"
              value={selecteditem.price}
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
            <label>Category:</label>
            <input
              disabled={enabled}
              name="category"
              value={selecteditem.category}
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
            <label>Image:</label>
            <input
              disabled={enabled}
              name="image"
              value={selecteditem.image}
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
            <label>Rating:</label>
            <input
              disabled={enabled}
              name="rating"
              value={selecteditem.rating.rate}
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
