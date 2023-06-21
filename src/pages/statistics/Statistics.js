import React, { useContext, useState } from "react";
import { LangContext } from "../../context/LanguageProvider";
import moment from "moment";
import { Tooltip } from "antd";

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
      const startdate = moment.unix(dateindex.start).format("D ddd");
      // const enddate = moment.unix(dateindex.end).format("Do dddd");
      barstatisticsdatesindex.push(
        <div className="dates-row">
          <span className="dates-range">{`${startdate}`}</span>
        </div>
      );
    }
    return barstatisticsdatesindex;
  };

  const maxItems = Object.values(barstatistics.data).reduce(
    (max, data) => Math.max(max, Object.keys(data.data).length),
    0
  );
  console.log("maxitems",maxItems)
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
                  <span className="orangespan"></span>
                  Created
                </label>
                <label>
                  <input
                    value="completed"
                    onChange={showorhidebar}
                    type="checkbox"
                  />
                  <span className="bluespan"></span>
                  Completed
                </label>
                <label>
                  <input
                    value="overdue"
                    onChange={showorhidebar}
                    type="checkbox"
                  />
                  <span className="redspan"></span>
                  Overdue
                </label>
              </div>
              <div className="chart">
                <div className="leftchart">
                  <div className="bar-grouup">
                    <div className=" barlist">
                      {Array.from({ length: maxItems }, (_, index) => {
                        const itemValues = [];

                        for (const dataType in barstatistics.data) {
                          const dataObject = barstatistics.data[dataType].data;
                          const item = dataObject[index + 1];

                          if (item) {
                            const { start, end, count } = item;
                            itemValues.push({ dataType, start, end, count });
                          }
                        }
                        return (
                          <div key={index} className="barlistitem">
                            {itemValues?.map((val) => {
                              return (
                                selecteddate.includes(`${val.dataType}`) && (
                                  <Tooltip
                                    title={`${val.count} ${val.dataType}`}
                                  >
                                    <div
                                      className={`${val.dataType} barlistitemvalue`}
                                      style={{
                                        height: `${val.count + 5}px`,
                                      }}
                                    ></div>
                                  </Tooltip>
                                )
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="verticalcounts">
                    <ul>
                      <li>40</li>
                      <li>30</li>
                      <li>20</li>
                      <li>10</li>
                      <li>0</li>
                    </ul>
                  </div>
                </div>
                <div className="rightchart">
                  <div className="showdates">
                    <div className="createddates">
                      {" "}
                      {displayDates(barstatistics.data.created.data)}
                    </div>
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
