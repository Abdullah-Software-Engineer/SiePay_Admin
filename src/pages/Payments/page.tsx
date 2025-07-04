import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

const tabConfig = [
  {
    key: "paid",
    label: "Paid",
    placeholder: "Payment ID, Description",
    showExport: true,
    info: null,
  },
  {
    key: "unresolved",
    label: "Unresolved",
    placeholder: "Txn ID, Payment ID, Description",
    showExport: false,
    info: "Crypto.com Pay only captures on-chain payments if the customer sent the exact amount presented in the payment page and within time. Other cases such as underpaid or late payment are treated as Unresolved payments. Crypto.com Pay will automatically refund those payments. To know more about on-chain payments, please go to What are On-Chain Payments.",
  },
  {
    key: "refund",
    label: "Refund History",
    placeholder: "Payment ID, Refund Id",
    showExport: false,
    info: null,
  },
];

const Payment = () => {
  const [activeTab, setActiveTab] = useState("paid");

  const currentTab = tabConfig.find((tab) => tab.key === activeTab);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Payment</h2>
          </div>
          <div className="absolute right-4 top-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="#001939" />
              <path
                d="M27.5 12.5L17.5 27.5H12.5L22.5 12.5H27.5Z"
                fill="#08B882"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#001939] rounded-lg p-2 mb-6 flex items-center">
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-2 rounded-full text-base font-medium transition-colors ${
              activeTab === tab.key ? "bg-[#08B882] text-white" : "text-white"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl p-6 border-4 border-[#001939]">
        {/* Info for Unresolved */}
        {currentTab?.info && (
          <div className="bg-[#F3F3F3] text-[#737373] text-sm font-gellix rounded-2xl p-3 mb-4 flex gap-4">
            <img src="/assets/payment_exclamation.png" alt="Info" className="w-6 h-6" />
            {currentTab.info}
          </div>
        )}
        {/* Search/Filter/Export Bar */}
        <div className="flex items-center gap-2 mb-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-4xl text-gray-700 border border-gray-200">
            <Filter size={18} />
            <span>Filter</span>
            <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">
              0
            </span>
          </button>
          <div className="flex-1">
            <div className="relative">
              <input
                className="w-full pl-10 pr-4 py-2 rounded-4xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                placeholder={currentTab?.placeholder}
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          {currentTab?.showExport && (
            <button className="flex items-center gap-2 px-5 py-2 bg-[#08B882] text-white rounded-lg font-medium">
              <Download size={18} /> Export
            </button>
          )}
        </div>
        {/* No Data State */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/payment-search.png"
            alt="No Data"
            className="max-w-[152.16px] max-h-[192.97PX] "
          />
          <div className="text-[#001939] text-2xl font-semibold font-gellix ">
            No Data
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
