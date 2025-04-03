import { display } from "@mui/system";
import React from "react";
import Chart from "react-apexcharts";

const BalanceChart = ({ chartData }) => {
  const series = [
    {
      name: "Available Balance",
      data: chartData.balances, // ✅ Dynamic data
    },
  ];

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: chartData.categories, // ✅ Dynamic categories
      labels: { 
        
        style: {
          fontSize: "14px", 
          fontWeight: 400, 
          fontFamily: "Inter",
          color: "#686873" 
        },
      },
      axisTicks: { show: false },
      axisBorder: { show: true, color: "#686873" },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
        borderRadiusApplication: "end",
        distributed: true, // ✅ Individual colors for bars
      },
    },
    dataLabels: { enabled: false },
    colors: chartData.colors, // ✅ Dynamic bar colors
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
  };
  

  return (
    <div className=" bg-white" style={{ borderRadius: "25px", overflow: "hidden" }}>
      <Chart options={chartOptions} series={series} type="bar" height={270} />
    </div>
  );
};

export default BalanceChart;
