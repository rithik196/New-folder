import React from "react";
import Chart from "react-apexcharts";
import data from "../../json files/data.json";

const TransactionCard = () => {
  const totalTransactions = data.transactions.reduce(
    (sum, txn) => sum + txn.count,
    0
  );

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: data.transactions.map((txn) => txn.label),
    colors: data.colors,
    legend: {
      show: false, // Hide default legend
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: "bold",
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Transactions", // Keep only "Transactions" here
              formatter: function () {
                return `${totalTransactions}`;
              },
            },
          },
        },
      },
    },
  };

  const chartSeries = data.transactions.map((txn) => txn.count);

  return (
    <div className="flex flex-col md:flex-row -ml-17" >
      {/* Chart */}
      <div className="w-full md:w-2/3 flex justify-center">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="80%"
        />
      </div>

      {/* Labels in 2 Columns */}
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-29  mt-4 md:mt-0">
        {data.transactions.map((txn, index) => (
          <div
            key={index}
            className="flex items-center min-w-[220px] whitespace-nowrap"
          >
            <span
              className="inline-block w-3 h-3 rounded-sm mr-2"
              style={{ backgroundColor: data.colors[index] }}
            ></span>
            <span className="text-sm font-medium">
              {txn.label} <b>{txn.count}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionCard;
