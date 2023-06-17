import React, { useContext, useState } from "react";
import { LangContext } from "../../context/LanguageProvider";
import moment from "moment";

const Statistics = () => {
  const barstatistics = {
    data: {
      created: {
        count: 545,
        data: {
          1: {
            start: 1685304000,
            end: 1685390399,
            count: 117,
          },
          2: {
            start: 1685390400,
            end: 1685476799,
            count: 171,
          },
          3: {
            start: 1685476800,
            end: 1685563199,
            count: 139,
          },
          4: {
            start: 1685563200,
            end: 1685649599,
            count: 41,
          },
          5: {
            start: 1685649600,
            end: 1685735999,
            count: 51,
          },
          6: {
            start: 1685736000,
            end: 1685822399,
            count: 12,
          },
          7: {
            start: 1685822400,
            end: 1685908799,
            count: 14,
          },
        },
      },
      completed: {
        count: 347,
        data: {
          1: {
            start: 1685304000,
            end: 1685390399,
            count: 77,
          },
          2: {
            start: 1685390400,
            end: 1685476799,
            count: 102,
          },
          3: {
            start: 1685476800,
            end: 1685563199,
            count: 84,
          },
          4: {
            start: 1685563200,
            end: 1685649599,
            count: 38,
          },
          5: {
            start: 1685649600,
            end: 1685735999,
            count: 31,
          },
          6: {
            start: 1685736000,
            end: 1685822399,
            count: 1,
          },
          7: {
            start: 1685822400,
            end: 1685908799,
            count: 14,
          },
        },
      },
      overdue: {
        count: 117,
        data: {
          1: {
            start: 1685304000,
            end: 1685390399,
            count: 19,
          },
          2: {
            start: 1685390400,
            end: 1685476799,
            count: 9,
          },
          3: {
            start: 1685476800,
            end: 1685563199,
            count: 30,
          },
          4: {
            start: 1685563200,
            end: 1685649599,
            count: 16,
          },
          5: {
            start: 1685649600,
            end: 1685735999,
            count: 24,
          },
          6: {
            start: 1685736000,
            end: 1685822399,
            count: 4,
          },
          7: {
            start: 1685822400,
            end: 1685908799,
            count: 15,
          },
        },
      },
    },
  };

  console.log("barstatistics", barstatistics);
  const { language, weblanguages } = useContext(LangContext);

  const [selecteddate, setSelectedDate] = useState([]);

  const showorhidebar = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDate((prev) => [...prev, value]);
    } else {
      setSelectedDate((prev) => prev.filter((date) => date !== value));
    }
  };

  const displayDates = (barstatisticsdates) => {
    const barstatisticsdatesindex = [];
    for (const index in barstatisticsdates) {
      const dateindex = barstatisticsdates[index];
      const startdate = moment.unix(dateindex.start).format("Do dddd");
      const enddate = moment.unix(dateindex.end).format("Do dddd");
      barstatisticsdatesindex.push(
        <div className="dates-row" style={{ height: `${dateindex.count}px` }}>
          <span className="dates-range">{`${startdate}-- ${enddate}`}</span>
        </div>
      );
    }
    return barstatisticsdatesindex;
  };

  // const chartArr = Object.values(barstatistics.data.completed.data)

  const abc = Object.values(barstatistics.data);

  console.log("abc", abc);

  console.log("data.completed.data");
  //   const barheight = (data, count) => {
  //     const totalcount = data.count;
  //     return count / totalcount;
  //   };

  return (
    <section>
      <div className="dashboard-statistics">
        <div className="dashboard-header-statistics">
          <h3>{weblanguages[language].statistics}</h3>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="wholechart">
              <div className="checkboxes">
                <label>
                  <input
                    value="created"
                    onChange={showorhidebar}
                    type="checkbox"
                  />
                  Created
                </label>
                <label>
                  <input
                    value="completed"
                    onChange={showorhidebar}
                    type="checkbox"
                  />
                  Completed
                </label>
                <label>
                  <input
                    value="overdue"
                    onChange={showorhidebar}
                    type="checkbox"
                  />
                  Overdue
                </label>
              </div>
              <div className="chart">
                <div className="bar-grouup">
                  {abc?.map((chartVal) => {
                    console.log("chr", Object.values(chartVal));
                    return (
                      <div className="d-flex" style={{ gap: "20px" }}>
                        {Object.values(abc[0]?.data)?.map((create) => {
                          return (
                            <div>
                              <div
                                className="createdbar"
                                style={{ height: `${create.count}px` }}
                              >
                                {create.count}
                              </div>
                            
                            </div>
                          );
                        })}
                        {Object.values(abc[1]?.data)?.map((create) => {
                          return (
                            <div>
                         
                              {selecteddate.includes("completed") && (
                                <div className="completedbar" style={{ height: `${create.count}px` }}>{create.count}</div>
                              )}
                             
                            </div>
                          );
                        })}
                        {Object.values(abc[2]?.data)?.map((create) => {
                          return (
                            <div>
                           
                              {selecteddate.includes("overdue") && (
                                <div className="overduebar" style={{ height: `${create.count}px` }}>{create.count}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                <div className="showdates">
                  <div className="createddates">
                    {" "}
                    {displayDates(barstatistics.data.created.data)}
                  </div>
                  <div className="completeddates">
                    {" "}
                    {displayDates(barstatistics.data.completed.data)}
                  </div>
                  <div className="overduedates">
                    {" "}
                    {displayDates(barstatistics.data.overdue.data)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
