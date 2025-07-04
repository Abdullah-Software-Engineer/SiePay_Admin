
const Payout = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payout Accounts</h2>
        <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg flex items-center">
          <span className="mr-1">+</span>
          Add Account
        </button>
      </div>

      {/* No Data State */}
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
        <img src="/no-data.svg" alt="No Data" className="w-24 h-24 mb-2" />
        <p className="text-gray-600 font-medium">No Data</p>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Showing Results</span>
          <select className="border rounded-lg px-2 py-1">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-lg text-gray-600">Previous</button>
          <button className="px-3 py-1 bg-[#08B882] text-white rounded-lg">1</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">2</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">3</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">4</button>
          <span>...</span>
          <button className="px-3 py-1 border rounded-lg text-gray-600">32</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">Next</button>
        </div>
      </div>

      {/* Table (Hidden when no data) */}
      <div className="hidden">
        <table className="w-full mt-6">
          <thead>
            <tr className="text-left">
              <th className="pb-4 text-gray-600">Alias</th>
              <th className="pb-4 text-gray-600">Currency</th>
              <th className="pb-4 text-gray-600">Account Number/Address</th>
              <th className="pb-4 text-gray-600">Status</th>
              <th className="pb-4 text-gray-600">Type</th>
              <th className="pb-4 text-gray-600">Schedule</th>
              <th className="pb-4 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows when there is data */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payout; 