import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../../context/LanguageProvider";
import customerslist from "../../customers-list.json";
import { ThemeContext } from "../../context/ThemeProvider";

const Customers = () => {
  const { language, weblanguages } = useContext(LangContext);
  const {theme,setTheme,paintcolor,setPaintColor,colors}=useContext(ThemeContext)


  const optionValues = [10, 20, 50, 100];
  const [currentPage, setcurrentPage] = useState(1);
  const [userPerPage, setuserPerPage] = useState(optionValues[0]);
  const userLastIndex = currentPage * userPerPage;
  const userFirstIndex = userLastIndex - userPerPage;
  const [currentUserData, setCurrentUserData] = useState(customerslist);
  const [buttonColorIndex, setButtonColorIndex] = useState(0);
  const totalpages = 10;
  const visiblepages = 3;

  useEffect(() => {
    setCurrentUserData(customerslist.slice(userFirstIndex, userLastIndex));
  }, [currentPage, userPerPage, userFirstIndex, userLastIndex]);

  useEffect(() => {
    const dropdownColorIndex = Math.ceil(currentPage - 1);
    setButtonColorIndex(dropdownColorIndex);
  }, [currentPage]);

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
          className={`button-item ${
            buttonColorIndex === i - 1 ? "buttonbgcolor" : ""
          }`}
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

  console.log("123", currentPage * userPerPage);
  return (
    <section className="dashboard-customers">
      <div className="dashboard-header-customers">
        <h3>{weblanguages[language].topcustomers}</h3>
      </div>
      <div className="container-fluid">
        <div className="row">
          <table className="tablestyle">
            <thead>
              <tr>
                <th>ID</th>
                <th>{weblanguages[language].name}</th>
                <th>{weblanguages[language].email}</th>
                <th>{weblanguages[language].location}</th>
                <th>{weblanguages[language].phone}</th>
                <th>{weblanguages[language].totalexpenses}</th>
                <th>{weblanguages[language].totalorderstwo}</th>
                <th className="infotableheader">Info</th>
                <th className="deletetableheader">Delete</th>
              </tr>
            </thead>
            {currentUserData?.map((item, index) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.location}</td>
                  <td>{item.phone}</td>
                  <td>{item.total_spend}</td>
                  <td>{item.total_orders}</td>
                  <td className="infotableheader"><i class="bi bi-info-circle"></i></td>
                  <td className="deletetableheader"><input type="checkbox" /></td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="button-list">
            <div className="leftcontent">
              <select
                className="select"
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
              >
                {currentPage !== 1 ? "Previous" : null}
              </button>
              {showallpagenumbers()}
              <button
                onClick={() => {
                  nextButton();
                }}
                className="button-next"
              >
                {currentPage * userPerPage < 100 ? "Next" : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
