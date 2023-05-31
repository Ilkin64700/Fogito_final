import React, { useContext } from "react";
import { BiShoppingBag, BiDollarCircle, BiReceipt } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import ApexCharts from "react-apexcharts";
import { LangContext } from "../../context/LanguageProvider";

const Dashboard = () => {
  const statistics = [
    {
      icon: <BiShoppingBag className="statistics-icons" />,
      count: "1,995",
      title: "Total sales",
    },
    {
      icon: <LuShoppingCart className="statistics-icons" />,
      count: "2,001",
      title: "Daily visits",
    },
    {
      icon: <BiDollarCircle className="statistics-icons" />,
      count: "$2,632",
      title: "Total income",
    },
    {
      icon: <BiReceipt className="statistics-icons" />,
      count: "1,711",
      title: "Total orders",
    },
  ];

  var options = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const {language,setLanguage,weblanguages} =useContext(LangContext)

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h3>Dashboard</h3>
      </div>
      <div className="container">
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
            <ApexCharts options={options} series={options.series} type="line" width={500}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
