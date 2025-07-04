import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, TestTube } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  referenceId: string;
  email: string;
  description: string;
  created: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: '$ 10',
    referenceId: '-',
    email: 'saqibkamal@gmail.com',
    description: 'Testing',
    created: 'Feb 06 2025, 01:16am'
  }
];

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(mockCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = mockCustomers.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Customers</h2>
          </div>
          <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#07a374] transition-colors">
            + New Customer
          </button>
        </div>
      </div>

      {/* Test Data Banner */}
      <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <TestTube size={16} className="text-white" />
        </div>
        <span className="text-red-800 font-medium">Test Data</span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border-4 border-[#001939] overflow-hidden">
        {/* Search/Filter Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
              <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">0</span>
            </button>
            <div className="flex-1">
              <div className="relative">
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                  placeholder="Payment ID, Description"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.referenceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#08B882] hover:underline cursor-pointer">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Showing Results</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className="text-sm text-gray-700">Previous</span>
            
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm ${
                    currentPage === page 
                      ? 'bg-[#08B882] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2 text-gray-400">...</span>
              <button className="w-8 h-8 rounded text-sm text-gray-700 hover:bg-gray-100">
                32
              </button>
            </div>
            
            <span className="text-sm text-gray-700">Next</span>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers; 