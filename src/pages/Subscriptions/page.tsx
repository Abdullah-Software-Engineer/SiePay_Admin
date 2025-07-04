import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Subscription {
  id: string;
  amount: number;
  status: 'pending' | 'active' | 'cancelled' | 'expired';
  customer: string;
  product: string;
  billing: string;
  created: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    amount: 10,
    status: 'pending',
    customer: 'saqibkamal@gmail.com',
    product: 'Coding Dapps',
    billing: 'Week',
    created: 'Feb 06 2025, 01:16am'
  },
  {
    id: '2',
    amount: 10,
    status: 'pending',
    customer: 'saqibkamal@gmail.com',
    product: 'Coding Dapps',
    billing: 'Week',
    created: 'Feb 06 2025, 01:16am'
  },
  {
    id: '3',
    amount: 10,
    status: 'pending',
    customer: 'saqibkamal@gmail.com',
    product: 'Coding Dapps',
    billing: 'Week',
    created: 'Feb 06 2025, 01:16am'
  },
  {
    id: '4',
    amount: 10,
    status: 'pending',
    customer: 'saqibkamal@gmail.com',
    product: 'Coding Dapps',
    billing: 'Week',
    created: 'Feb 06 2025, 01:16am'
  },
  {
    id: '5',
    amount: 10,
    status: 'pending',
    customer: 'saqibkamal@gmail.com',
    product: 'Coding Dapps',
    billing: 'Week',
    created: 'Feb 06 2025, 01:16am'
  }
];

const tabConfig = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Cancelled' },
  { key: 'expired', label: 'Expired' }
];

const Subscriptions = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredSubscriptions = activeTab === 'all' 
    ? mockSubscriptions 
    : mockSubscriptions.filter(sub => sub.status === activeTab);

  const hasData = filteredSubscriptions.length > 0;
  const showTableForTabs = ['all', 'pending'];
  const shouldShowTable = showTableForTabs.includes(activeTab) && hasData;

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'expired':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-24 h-24 mb-6 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#08B882] flex items-center justify-center relative">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <div className="text-[#08B882] text-2xl font-bold">$</div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#08B882] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-full bg-[#08B882]"></div>
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#08B882] rounded-full"></div>
        </div>
      </div>
      <div className="text-[#001939] text-lg font-semibold mb-2">
        Subscriptions Let You Collect Recurring Payments For Products With Any Pricing Model.
      </div>
      <div className="text-[#08B882] text-sm mb-6 cursor-pointer hover:underline flex items-center gap-1">
        Please Find More Information In The Integration Guide
        <ExternalLink size={14} />
      </div>
      <button className="bg-[#08B882] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#07a374] transition-colors">
        + Create Subscription
      </button>
    </div>
  );

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubscriptions = filteredSubscriptions.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              Subscriptions 
              <span className="text-[#08B882]">(Integration Guide)</span>
              <ExternalLink size={20} className="text-[#08B882]" />
            </h2>
          </div>
          <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#07a374] transition-colors">
            + Create Subscription
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#001939] rounded-lg p-2 mb-6 flex items-center">
        {tabConfig.map(tab => (
          <button
            key={tab.key}
            className={`flex-1 py-2 rounded-full text-base font-medium transition-colors ${
              activeTab === tab.key ? 'bg-[#08B882] text-white' : 'text-white hover:text-[#08B882]'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border-4 border-[#001939] overflow-hidden">
        {shouldShowTable ? (
          <>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        $ {subscription.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(subscription.status)}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#08B882] hover:underline cursor-pointer">
                        {subscription.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscription.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscription.billing}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscription.created}
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
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default Subscriptions; 