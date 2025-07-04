import React, { useState } from "react";
import { Filter, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyInvoiceState from "./components/EmptyInvoiceState";

interface InvoiceData {
  id: string;
  amount: number;
  status: string;
  invoiceNumber: string;
  customer: string;
  due: string;
  created: string;
  label: string;
  category: string;
  startedAt: string;
  endAt: string;
  payments: number;
}

const InvoicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const filterCount = 0; // Static filter count since setFilterCount is not used
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const demoData: InvoiceData[] = [
    {
      id: "1",
      amount: 10,
      status: "Active",
      invoiceNumber: "15f3ae6b-9443-450b-A674-B3848685aaaf",
      customer: "saqibkaml@gmail.com",
      due: "Feb 11,2025",
      created: "Feb 06, 2025, 01:16am",
      label: "Some label",
      category: "FLEXIBLE",
      startedAt: "19/01/2025 11:02",
      endAt: "-",
      payments: 0,
    },
    {
      id: "2",
      amount: 25,
      status: "Active",
      invoiceNumber: "25f3ae6b-9443-450b-A674-B3848685aaaf",
      customer: "john.doe@example.com",
      due: "Feb 15,2025",
      created: "Feb 08, 2025, 02:30pm",
      label: "Generate invoice",
      category: "FIXED - (undefined)",
      startedAt: "23/01/2025 18:02",
      endAt: "-",
      payments: 2,
    },
    // Repeat some data for demo
    ...Array(3).fill({
      id: "3",
      amount: 10,
      status: "Active",
      invoiceNumber: "15f3ae6b-9443-450b-A674-B3848685aaaf",
      customer: "saqibkaml@gmail.com",
      due: "Feb 11,2025",
      created: "Feb 06, 2025, 01:16am",
      label: "Some label",
      category: "FLEXIBLE",
      startedAt: "19/01/2025 11:02",
      endAt: "-",
      payments: 0,
    }),
  ];

  const tabs = [
    { key: "all", label: "All Invoices" },
    { key: "draft", label: "Draft" },
    { key: "outstanding", label: "Outstanding" },
    { key: "past_due", label: "Past Due" },
    { key: "paid", label: "Paid" },
  ];

  const TableContent = () => (
    <div className="bg-[white] rounded-[13px] p-4">
      <div className="flex gap-4 mb-4">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter{" "}
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-sm">
            {filterCount}
          </span>
        </button>
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Payment ID, Description"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Label
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Started At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {demoData.map((invoice, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.label}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.startedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.endAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.payments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/invoices/${invoice.id}`)
                    }
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Showing Results</span>
          <select className="border border-gray-200 rounded-md px-2 py-1 text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border border-gray-200 rounded-md text-sm disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, "...", 32].map((page, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-emerald-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="px-3 py-1 border border-gray-200 rounded-md text-sm"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="bg-[#001939] text-white rounded-[20px] p-6 mb-6 relative overflow-hidden flex justify-between items-center">
        <h1 className="text-3xl font-semibold font-dashboardmenu">Invoices</h1>
        <button className="flex items-center px-4 py-2 bg-[#08B882] text-white rounded-full hover:bg-emerald-600 transition-colors text-base font-dashboardmenu">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      <div className=" bg-[#001939] p-2 rounded-[20px]">
        <div className="flex rounded-full bg-gradient-to-r from-white to-[#CECECE80] bg-[#001939] p-2 mx-2 my-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-6 py-2 text-sm font-medium ${
                activeTab === tab.key
                  ? "text-white rounded-4xl bg-[#08B882]"
                  : "text-text-white hover:text-text-white"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "all" || activeTab === "draft" ? (
          <TableContent />
        ) : (
          <EmptyInvoiceState />
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
