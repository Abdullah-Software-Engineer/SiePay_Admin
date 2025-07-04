import { useState } from "react";
import AllBalances from "./components/AllBalances";
import TransactionHistory from "./components/TransactionHistory";
import PayoutHistory from "./components/PayoutHistory";

const BalancePage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    { id: "1", label: "All Balances", component: <AllBalances /> },
    {
      id: "2",
      label: "Transaction History",
      component: <TransactionHistory />,
    },
    { id: "3", label: "Payout History", component: <PayoutHistory /> },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 bg-[#001939] rounded-lg p-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white m-0">Balance</h1>
        <img
          src="/assets/logo.png"
          alt="Arrow Right"
          className="w-11 h-9 text-white"
        />
      </div>

      <div className="bg-[#001939] rounded-3xl border-[#001939] border-[20px]">
        <div className="bg-[#001939] p-1 rounded-2xl">
          <div className="flex rounded-full bg-gradient-to-r from-white to-[#CECECE80] p-2 mx-2 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#00A76F] text-white"
                    : "text-[#637381] hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 bg-white rounded-[13px]">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default BalancePage;
