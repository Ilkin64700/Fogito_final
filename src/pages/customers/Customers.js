import React, { useContext, useEffect, useRef, useState } from "react";
import { LangContext } from "../../context/LanguageProvider";
import customerslist from "../../customers-list.json";
import { ThemeContext } from "../../context/ThemeProvider";
import InfoModal from "../../components/UI/InfoModal";
import { BiSearchAlt, BiChevronDown, BiChevronUp } from "react-icons/bi";
import DeleteModal from "../../components/UI/DeleteModal";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { CgTrashEmpty } from "react-icons/cg";
const Customers = () => {
  const { language, weblanguages } = useContext(LangContext);
  const { theme, setTheme, paintcolor, setPaintColor, colors } =useContext(ThemeContext);
  const [selecteditem, setSelectedItem] = useState();
  const [opendeletemodal, setOpenDeleteModal] = useState(false);
  const [showfilters, SetShowFilters] = useState(false);
  const [searchname, setSearchName] = useState("");
  const [searchmail, setSearchMail] = useState("");
  const [searchlocation, setSearchLocation] = useState("");
  const [searchphone, setSearchPhone] = useState("");
  const [searchexpenses, setSearchExpenses] = useState("");
  const [basketdeletecustomers, setBasketDeleteCustomers] = useState([]);

  const tableheaders = [
    "ID",
    "NAME",
    "EMAIL",
    "LOCATION",
    "PHONE",
    "TOTAL EXPENSES",
    "TOTAL ORDERS",
  ];
  const [showcolumn, setShowColumn] = useState(tableheaders);

  const optionValues = [10, 20, 50, 100];
  const [currentPage, setcurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(optionValues[0]);
  const userLastIndex = currentPage * userPerPage;
  const userFirstIndex = userLastIndex - userPerPage;
  const [currentUserData, setCurrentUserData] = useState(customerslist);
  const [buttonColorIndex, setButtonColorIndex] = useState(0);
  const [showmodal, setShowModal] = useState(false);
  const totalpages = 10;
  const visiblepages = 3;

  useEffect(() => {
    setCurrentUserData(customerslist.slice(userFirstIndex, userLastIndex));
  }, [currentPage, userPerPage, userFirstIndex, userLastIndex]);

  useEffect(() => {
    const dropdownColorIndex = Math.ceil(currentPage - 1);
    setButtonColorIndex(dropdownColorIndex);
  }, [currentPage]);

  const clickOutside = useRef(null);

  const [showDropdDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const closeOpenDropdown = (e) => {
      if (!clickOutside.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", closeOpenDropdown);

    return () => document.removeEventListener("mousedown", closeOpenDropdown);
  }, []);

  const AddRecycleBin = (e, item) => {
    if (e.target.checked) {
      setBasketDeleteCustomers([...basketdeletecustomers, item]);
    } else {
      const unchechkedbasket = basketdeletecustomers.filter((customer) => customer.id !== item.id);
      setBasketDeleteCustomers(unchechkedbasket);
    }
  };

  const emptyTrashBasket = () => {
    const newlist = currentUserData.filter((item) => !basketdeletecustomers.map((customer) => customer.id).includes(item.id));
    setCurrentUserData(newlist);
    setBasketDeleteCustomers([])
    console.log("newlist",newlist)
  };

  const showorhide = (tableheader) => {
    if (showcolumn.includes(tableheader)) {
      setShowColumn(
        showcolumn.filter((tableheaderitem) => tableheaderitem !== tableheader)
      );
    } else {
      setShowColumn([...showcolumn, tableheader]);
    }
  };

  const showallpagenumbers = () => {
    const pageCountList = [];
    let startpage = currentPage - Math.floor(visiblepages / 2);
    startpage = Math.max(startpage, 1);
    const endpage = Math.min(startpage + visiblepages - 1, totalpages);

    for (let i = startpage; i <= endpage; i++) {
      if (i * userPerPage > 100) {
        return pageCountList;
      }
      pageCountList.push(
        <button
          key={i}
          style={{
            backgroundColor:
              buttonColorIndex === i - 1
                ? paintcolor
                : ""
                ? theme === "light"
                  ? "black"
                  : "white"
                : "",
            color:
              buttonColorIndex === i - 1
                ? theme === "light"
                  ? "black"
                  : "white"
                : "",
          }}
          className="button-item"
          onClick={(e) => {
            setcurrentPage(i);
            setButtonColorIndex(i - 1);
          }}
        >
          {i}
        </button>
      );
    }
    return pageCountList;
  };

  const prevButton = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
      setButtonColorIndex(currentPage - 2);
    }
  };

  const nextButton = () => {
    const nextpage = currentPage + 1;
    if (nextpage <= totalpages) {
      setcurrentPage(nextpage);
      setButtonColorIndex(currentPage);
    }
  };

  const selectValueChange = (e) => {
    const selectOptionNumberList = customerslist.slice(0, e.target.value);
    setCurrentUserData(selectOptionNumberList);
  };

  const handleChange = (e) => {
    setuserPerPage(e.target.value);
    setcurrentPage(1);
  };

  return (
    <section className="dashboard-customers">
      <div className="dashboard-header-customers">
        <div className="customerheaderleftcontent">
          <div className="customerflexheader">
            <h3>{weblanguages[language].topcustomers}</h3>
          </div>
          <div className="search">
            <input
              type="search"
              placeholder="Search by  name"
              value={searchname}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <BiSearchAlt className="search-icon" />
          </div>
        </div>
        <div className="customerheaderrightcontent">
          <div onClick={() =>{emptyTrashBasket()}} className="deleticon me-3">
            {!!basketdeletecustomers.length && (
              <div className="basket-count">{basketdeletecustomers.length}</div>
            )}
            <button className="btn btn-danger">
              <CgTrashEmpty className="trashempty" />
            </button>
          </div>
          <div className="checkcolumnscustomers me-4">
            <div ref={clickOutside} className="dropdown">
              <div
                onClick={() => {
                  setShowDropDown(!showDropdDown);
                }}
                className="dropdown-button btn"
              >
                <BsReverseListColumnsReverse className="columnlist" />
                Columns
                {showDropdDown ? (
                  <BiChevronDown className="downarrow" />
                ) : (
                  <BiChevronUp className="uparrow" />
                )}
              </div>
              {showDropdDown && (
                <div className="dropdown-content dropdownwidth">
                  <div className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={showcolumn.includes("ID")}
                      onChange={() => showorhide("ID")}
                    />
                    ID
                  </div>
                  <div className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={showcolumn.includes("NAME")}
                      onChange={() => showorhide("NAME")}
                    />
                    Name
                  </div>
                  <div className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={showcolumn.includes("EMAIL")}
                      onChange={() => showorhide("EMAIL")}
                    />
                    Email
                  </div>
                  <div className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={showcolumn.includes("LOCATION")}
                      onChange={() => showorhide("LOCATION")}
                    />
                    Location
                  </div>
                  <div className="dropdown-item">
                    <input
                      checked={showcolumn.includes("PHONE")}
                      onChange={() => showorhide("PHONE")}
                      type="checkbox"
                    />
                    Phone
                  </div>
                  <div className="dropdown-item">
                    <input
                      checked={showcolumn.includes("TOTAL EXPENSES")}
                      onChange={() => showorhide("TOTAL EXPENSES")}
                      type="checkbox"
                    />
                    Total Expenses
                  </div>
                  <div className="dropdown-item">
                    <input
                      checked={showcolumn.includes("TOTAL ORDERS")}
                      onChange={() => showorhide("TOTAL ORDERS")}
                      type="checkbox"
                    />
                    Total Orders
                  </div>
                  <div
                    onClick={() => {
                      setShowDropDown(!showDropdDown);
                    }}
                    className="dropdownsave"
                  >
                    <a>Save</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="checkcolumnscustomers me-5">
            <div className="dropdown">
              <div
                onClick={() => {
                  SetShowFilters(!showfilters);
                }}
                className="dropdown-button btn"
              >
                <FiFilter className="columnlist" />
                Filters
                {showfilters ? (
                  <BiChevronDown className="downarrow" />
                ) : (
                  <BiChevronUp className="uparrow" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showfilters && (
        <div className="allsearchinputs">
          <input
            type="search"
            placeholder="Search by  mail"
            value={searchmail}
            onChange={(e) => setSearchMail(e.target.value)}
          />
          <input
            type="search"
            placeholder="Search by  location"
            value={searchlocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <input
            type="search"
            placeholder="Search by  phone"
            value={searchphone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <input
            type="search"
            placeholder="Search by  expenses"
            value={searchexpenses}
            onChange={(e) => setSearchExpenses(e.target.value)}
          />
        </div>
      )}
      <div className="container-fluid">
        <div className="row">
          <table className="tablestyle">
            <thead>
              <tr>
                {showcolumn.includes("ID") && <th>ID</th>}
                {showcolumn.includes("NAME") && (
                  <th>{weblanguages[language].name}</th>
                )}
                {showcolumn.includes("EMAIL") && (
                  <th>{weblanguages[language].email}</th>
                )}
                {showcolumn.includes("LOCATION") && (
                  <th>{weblanguages[language].location}</th>
                )}
                {showcolumn.includes("PHONE") && (
                  <th>{weblanguages[language].phone}</th>
                )}
                {showcolumn.includes("TOTAL EXPENSES") && (
                  <th>{weblanguages[language].totalexpenses}</th>
                )}
                {showcolumn.includes("TOTAL ORDERS") && (
                  <th>{weblanguages[language].totalorderstwo}</th>
                )}
                <th className="infotableheader">Info</th>
                <th className="deletetableheader">Delete</th>
              </tr>
            </thead>
            {currentUserData
              ?.filter(
                (productitem) =>
                  productitem.name
                    .toLowerCase()
                    .includes(searchname.toLowerCase()) &&
                  productitem.email
                    .toLowerCase()
                    .includes(searchmail.toLowerCase()) &&
                  productitem.location
                    .toLowerCase()
                    .includes(searchlocation.toLowerCase()) &&
                  productitem.phone
                    .toLowerCase()
                    .includes(searchphone.toLowerCase()) &&
                  productitem.total_spend
                    .toLowerCase()
                    .includes(searchexpenses.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      {showcolumn.includes("ID") && <td>{item.id}</td>}
                      {showcolumn.includes("NAME") && <td>{item.name}</td>}
                      {showcolumn.includes("EMAIL") && <td>{item.email}</td>}
                      {showcolumn.includes("LOCATION") && (
                        <td>{item.location}</td>
                      )}
                      {showcolumn.includes("PHONE") && <td>{item.phone}</td>}
                      {showcolumn.includes("TOTAL EXPENSES") && (
                        <td>{item.total_spend}</td>
                      )}
                      {showcolumn.includes("TOTAL ORDERS") && (
                        <td>{item.total_orders}</td>
                      )}
                      <td
                        onClick={() => {
                          setShowModal(!showmodal);
                          setSelectedItem(item);
                        }}
                        className="infotableheader"
                      >
                        <i className="bi bi-info-circle"></i>
                      </td>
                      <td className="deletetableheader">
                        <input
                          onChange={(e) => AddRecycleBin(e, item)}
                          checked={basketdeletecustomers.map((product) => product.id).includes(item.id)}
                          type="checkbox"
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
          <div className="button-list">
            <div className="leftcontent">
              <select
                className={` ${paintcolor} select`}
                value={userPerPage}
                onChange={(e) => {
                  selectValueChange(e);
                  handleChange(e);
                }}
              >
                {optionValues.map((item, index) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="rightcontent">
              <button
                onClick={() => {
                  prevButton();
                }}
                className="button-previous"
                style={{ display: currentPage === 1 ? "none" : "inline-block" }}
              >
                {currentPage !== 1 ? "Previous" : null}
              </button>
              {showallpagenumbers()}
              <button
                onClick={() => {
                  nextButton();
                }}
                className="button-next"
                style={{
                  display:
                    currentPage * userPerPage >= 100 ? "none" : "inline-block",
                }}
              >
                {currentPage * userPerPage < 100 ? "Next" : null}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showmodal && (
        <InfoModal
          selecteditem={selecteditem}
          setSelectedItem={setSelectedItem}
          showmodal={showmodal}
          setShowModal={setShowModal}
        />
      )}
      {opendeletemodal && (
        <DeleteModal
          selecteditem={selecteditem}
          setSelectedItem={setSelectedItem}
          showmodal={showmodal}
          setShowModal={setShowModal}
          currentUserData={currentUserData}
          setCurrentUserData={setCurrentUserData}
          opendeletemodal={opendeletemodal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </section>
  );
};

export default Customers;
