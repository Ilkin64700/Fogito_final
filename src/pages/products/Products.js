import React, { useContext, useEffect, useRef, useState } from "react";
import { LangContext } from "../../context/LanguageProvider";
import productlist from "../../products.json";
import { ThemeContext } from "../../context/ThemeProvider";
import ProductModal from "../../components/UI/ProductModal";
import { BiSearchAlt, BiBasket } from "react-icons/bi";
import BasketDrawer from "../../components/layout/BasketDrawer"
const Customers = () => {
  const { language, weblanguages } = useContext(LangContext);
  const { theme, setTheme, paintcolor, setPaintColor, colors } =
    useContext(ThemeContext);

    const [opendrawer,setOpenDrawer]=useState(false)
  const [selecteditem, setSelectedItem] = useState();
  const [opendeletemodal, setOpenDeleteModal] = useState(false);
  const [search, setSearch] = useState("");

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

  const [basket, setBasket] = useState([]);

  const optionValues = [10, 20, 50, 100];
  const [currentPage, setcurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(optionValues[0]);
  const userLastIndex = currentPage * userPerPage;
  const userFirstIndex = userLastIndex - userPerPage;
  const [currentUserData, setCurrentUserData] = useState(productlist);
  const [buttonColorIndex, setButtonColorIndex] = useState(0);
  const [showmodal, setShowModal] = useState(false);
  const totalpages = 10;
  const visiblepages = 3;

  useEffect(() => {
    setCurrentUserData(productlist.slice(userFirstIndex, userLastIndex));
  }, [currentPage, userPerPage, userFirstIndex, userLastIndex]);

  useEffect(() => {
    const dropdownColorIndex = Math.ceil(currentPage - 1);
    setButtonColorIndex(dropdownColorIndex);
  }, [currentPage]);


  const AddBasket=(e,item)=>{
    if (e.target.checked) {
        setBasket([...basket,item])
    }
    else{
      const unchechkedbasket=basket.filter((basket)=>basket.id !== item.id)
      setBasket(unchechkedbasket)
    }
  }
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const showorhide = (tableheader) => {
    if (showcolumn.includes(tableheader)) {
      setShowColumn(
        showcolumn.filter((tableheaderitem) => tableheaderitem !== tableheader)
      );
    } else {
      setShowColumn([...showcolumn, tableheader]);
    }
  };

  const deletebyid = (id) => {
    const newlist = currentUserData.filter((item) => item.id !== id);
    setCurrentUserData(newlist);
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
            backgroundColor: buttonColorIndex === i - 1 ? paintcolor : "",
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
    const selectOptionNumberList = productlist.slice(0, e.target.value);
    setCurrentUserData(selectOptionNumberList);
  };

  const handleChange = (e) => {
    setuserPerPage(e.target.value);
    setcurrentPage(1);
  };

  return (
    <section className="dashboard-customers">
      <div className="dashboard-header-products">
        <h3>{weblanguages[language].totalproducts}</h3>
        <div className="search">
          <input
            type="search"
            placeholder="Search by  title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearchAlt className="search-icon" />
        </div>
        <div className="checkcolumnsproducts ms-5">
          <div className="basket">
            {!!basket.length && (
              <div className="basket-count">{basket.length}</div>
            )}
            <button onClick={()=>{setOpenDrawer(!opendrawer)}} className="basketbutton">
              <BiBasket className="basket-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <table className="tablestyle">
            <thead>
              <tr>
                {showcolumn.includes("ID") && <th>ID</th>}
                {showcolumn.includes("NAME") && (
                  <th>{weblanguages[language].title}</th>
                )}
                {showcolumn.includes("EMAIL") && (
                  <th>{weblanguages[language].price}</th>
                )}
                {showcolumn.includes("LOCATION") && (
                  <th>{weblanguages[language].category}</th>
                )}
                {showcolumn.includes("PHONE") && (
                  <th>{weblanguages[language].image}</th>
                )}
                {showcolumn.includes("TOTAL EXPENSES") && (
                  <th>{weblanguages[language].rating}</th>
                )}
                <th className="infotableheader">Info</th>
                <th className="deletetableheader">Add</th>
              </tr>
            </thead>
            {currentUserData
              ?.filter((productitem) =>
                productitem.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, index) => (
                <tbody>
                  <tr>
                    {showcolumn.includes("ID") && <td>{item.id}</td>}
                    {showcolumn.includes("NAME") && <td>{item.title}</td>}
                    {showcolumn.includes("EMAIL") && <td>{item.price}</td>}
                    {showcolumn.includes("PHONE") && <td>{item.category}</td>}
                    {showcolumn.includes("TOTAL EXPENSES") && (
                      <td>
                        <img width={50} height={50} src={item.image} />
                      </td>
                    )}
                    {showcolumn.includes("TOTAL ORDERS") && (
                      <td>{item.rating.rate}</td>
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
                      <input type="checkbox"
                      checked={basket.map((product)=>product.id).includes(item.id)}
                      onChange={(e)=>AddBasket(e,item)}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
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
        <ProductModal
          selecteditem={selecteditem}
          setSelectedItem={setSelectedItem}
          showmodal={showmodal}
          setShowModal={setShowModal}
        />
      )}
      {opendrawer && <BasketDrawer opendrawer={opendrawer} setOpenDrawer={setOpenDrawer}/>}
    </section>
  );
};

export default Customers;
