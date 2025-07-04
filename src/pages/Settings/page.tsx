import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("business");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/dashboard/settings/${tab}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Settings</h2>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-sm text-[#08B882]">Fee and limits</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#001939] rounded-lg p-2 mb-6">
        <div className="flex space-x-2">
          <button
            className={`flex-1 py-2 rounded-full text-base font-medium transition-colors ${
              activeTab === "business"
                ? "bg-[#08B882] text-white"
                : "text-white"
            }`}
            onClick={() => handleTabChange("business")}
          >
            Business
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-base font-medium transition-colors ${
              activeTab === "members" ? "bg-[#08B882] text-white" : "text-white"
            }`}
            onClick={() => handleTabChange("members")}
          >
            Members
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-base font-medium transition-colors ${
              activeTab === "payment" ? "bg-[#08B882] text-white" : "text-white"
            }`}
            onClick={() => handleTabChange("payment")}
          >
            Payment
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-base font-medium transition-colors ${
              activeTab === "payout" ? "bg-[#08B882] text-white" : "text-white"
            }`}
            onClick={() => handleTabChange("payout")}
          >
            Payout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
