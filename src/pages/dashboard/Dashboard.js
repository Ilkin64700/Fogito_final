import React, { useContext, useEffect, useState } from "react";
import { BiShoppingBag, BiDollarCircle, BiReceipt } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import ApexCharts from "react-apexcharts";
import { LangContext } from "../../context/LanguageProvider";
const Dashboard = () => {
  const { language, weblanguages } = useContext(LangContext);

  const statistics = [
    {
      icon: <BiShoppingBag className="statistics-icons" />,
      count: "1,995",
      title: weblanguages[language]?.totalsales,
    },
    {
      icon: <LuShoppingCart className="statistics-icons" />,
      count: "2,001",
      title: weblanguages[language]?.dailyvisits,
    },
    {
      icon: <BiDollarCircle className="statistics-icons" />,
      count: "$2,632",
      title: weblanguages[language]?.totalincome,
    },
    {
      icon: <BiReceipt className="statistics-icons" />,
      count: "1,711",
      title: weblanguages[language]?.totalorders,
    },
  ];

  const [options] = useState({
    series: [
      {
        name: "Online Customer",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Story Customer",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 300,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  useEffect(() => {
    localStorage.setItem("localization", language);
  }, [language]);

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h3>{weblanguages[language]?.dashboard}</h3>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            {statistics.map((item, index) => (
              <div className="col-5">
                <div className="leftcontent">
                  <div className="icon">{item.icon}</div>
                </div>
                <div className="rightcontent">
                  <div className="count">{item.count}</div>
                  <div className="title">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-6 editapex">
            <ApexCharts
              className="editheightapex"
              options={options}
              series={options.series}
              type="line"
              width={550}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
