import { useState } from "react";
import { CircleAlertIcon } from "lucide-react";

const Overview = () => {
  const [activeTab, setActiveTab] = useState("week");

  
  const data = {
    today: [
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Refund Volume",
        value: 356,
        percentage: "↓7.3%",
        change: "-$118.8 than last month",
        isPositive: false,
      },
      {
        title: "Gross Volume",
        value: 175,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 565,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
    ],
    week: [
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
    ],
    month: [
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
      {
        title: "Gross Volume",
        value: 815,
        percentage: "↑12.5%",
        change: "+$118.8 than last month",
        isPositive: true,
      },
    ],
    totalBalance: 815,
  };

  // Sample data for chart
  const chartDays = [
    "17 Sun",
    "18 Mon",
    "19 Tue",
    "20 Wed",
    "21 Thu",
    "22 Fri",
    "23 Sat",
    "17 Sun",
    "18 Mon",
    "19 Tue",
    "20 Wed",
    "21 Thu",
    "22 Fri",
    "23 Sat",
    "23 Sat",
  ];

  return (
    <div className="w-full  container-wrapper">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-3xl p-6 mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Overview</h2>
          </div>
          <div className="flex flex-col items-start py-3 px-8 rounded-[50px] border border-[#08B882]">
            <div className="flex items-center text-sm">
              <CircleAlertIcon className="h-4 w-4 mr-1 text-[#08B882]" />
              <span>Pay Rewards Level: 0.0 %</span>
            </div>
            <div className="flex items-center text-sm">
              <CircleAlertIcon className="h-4 w-4 mr-1 text-[#08B882]" />
              <span>Fee and limits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Data Banner */}
      <div className="bg-gradient-to-r from-[rgba(242,185,185,1)]/40 to-[rgba(229,62,62,1)]/40 rounded-lg p-4 mb-6 flex items-center">
        <div className="bg-red-500 rounded-full p-2 mr-3">
          <img
            src="/assets/icons/overview_icon.png"
            className="h-5 w-5 text-white"
          />
          {/* <BarChart2 className="h-5 w-5 text-white" /> */}
        </div>
        <span className="text-gray-800 font-medium">Test Data</span>
      </div>

      {/* Today Section */}
      <div className="mb-6">
        <h3 className="font-gellix font-medium text-2xl text-[#1E1E1E] leading-none tracking-normal capitalize mb-4">
          Today
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.today.map((item, index) => (
            <div
              key={index}
              className="border border-[#08B882] rounded-[15px] p-4"
            >
              <div className="text-sm text-gray-500">{item.title}</div>
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-bold my-1">${item.value}</div>
                <div
                  className={`text-xs ${
                    item.isPositive ? "text-[#08B882]" : "text-white"
                  } ${
                    item.isPositive ? "bg-[Green]/30" : "bg-[#FF0000]"
                  } rounded-full px-2 py-1`}
                >
                  {item.percentage}
                </div>
              </div>
              <div
                className={`text-xs ${
                  item.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-[#001939] rounded-lg p-6 mb-6">
        <div className="h-60 flex items-end justify-between">
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center h-full justify-end px-1"
              >
                <div
                  className="w-4 bg-white"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                ></div>
                <div
                  className="w-4 bg-[#08B882] mt-1"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                ></div>
              </div>
            ))}
        </div>
        <div className="flex justify-between mt-4 text-white text-xs">
          {chartDays.map((day, index) => (
            <div key={index} className="text-center">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <div className="bg-[#001939] rounded-lg p-4">
          <div className="bg-gray-700 rounded-full p-1 flex w-64 mb-6">
            <button
              className={`py-2 px-6 text-sm rounded-full ${
                activeTab === "week" ? "bg-[#08B882] text-white" : "text-white"
              }`}
              onClick={() => setActiveTab("week")}
            >
              This Week
            </button>
            <button
              className={`py-2 px-6 text-sm rounded-full ml-2 ${
                activeTab === "month" ? "bg-[#08B882] text-white" : "text-white"
              }`}
              onClick={() => setActiveTab("month")}
            >
              This Month
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
            {data[activeTab === "week" ? "week" : "month"].map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-[#08B882]/20 p-4"
                >
                  <div className="text-sm text-gray-500">{item.title}</div>
                  <div className="text-3xl font-bold my-1">${item.value}</div>
                  <div className="text-xs text-green-500">
                    {item.percentage}
                  </div>
                  <div className="text-xs text-green-500">{item.change}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Balance Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Balance</h3>
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-500">Total Balance</div>
          <div className="text-4xl font-bold mt-2">${data.totalBalance}</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
