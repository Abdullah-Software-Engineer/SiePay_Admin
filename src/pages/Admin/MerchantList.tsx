import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Power } from 'lucide-react';
import type { MerchantType } from '../../types';

// Mock data - replace with actual API call
const mockMerchants: MerchantType[] = [
  {
    _id: '1',
    email: 'merchant1@example.com',
    username: 'TechStore',
    status: true,
    flow: 'master',
    createdAt: '2024-01-15',
    totalTokens: 10000,
  },
  {
    _id: '2',
    email: 'merchant2@example.com',
    username: 'ShopEasy',
    status: false,
    flow: 'forward',
    createdAt: '2024-01-20',
    totalTokens: 5000,
  },
  {
    _id: '3',
    email: 'merchant3@example.com',
    username: 'DigitalMart',
    status: true,
    flow: 'master',
    createdAt: '2024-02-01',
    totalTokens: 15000,
  },
];

const MerchantList = () => {
  const [merchants] = useState<MerchantType[]>(mockMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [flowFilter, setFlowFilter] = useState<'all' | 'master' | 'forward'>('all');
  const navigate = useNavigate();

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && merchant.status) ||
                         (statusFilter === 'inactive' && !merchant.status);
    const matchesFlow = flowFilter === 'all' || merchant.flow === flowFilter;
    
    return matchesSearch && matchesStatus && matchesFlow;
  });

  const handleViewDetails = (merchantId: string) => {
    navigate(`/dashboard/admin/merchants/${merchantId}`);
  };

  const toggleMerchantStatus = (merchantId: string) => {
    // This would be an API call to update merchant status
    console.log('Toggle status for merchant:', merchantId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Merchant Management</h1>
          <p className="text-gray-600">Manage all merchants, their status, and flow settings</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search merchants by name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 h-4 w-4" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Flow Filter */}
            <div className="flex items-center gap-2">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={flowFilter}
                onChange={(e) => setFlowFilter(e.target.value as any)}
              >
                <option value="all">All Flow</option>
                <option value="master">Master</option>
                <option value="forward">Forward</option>
              </select>
            </div>
          </div>
        </div>

        {/* Merchants Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tokens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMerchants.map((merchant) => (
                  <tr key={merchant._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{merchant.username}</div>
                        <div className="text-sm text-gray-500">{merchant.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          merchant.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {merchant.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          merchant.flow === 'master'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {merchant.flow.charAt(0).toUpperCase() + merchant.flow.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {merchant.totalTokens?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(merchant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(merchant._id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleMerchantStatus(merchant._id)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                          title="Toggle Status"
                        >
                          <Power className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredMerchants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No merchants found</div>
              <div className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{merchants.length}</div>
            <div className="text-sm text-gray-500">Total Merchants</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">
              {merchants.filter(m => m.status).length}
            </div>
            <div className="text-sm text-gray-500">Active Merchants</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-blue-600">
              {merchants.filter(m => m.flow === 'master').length}
            </div>
            <div className="text-sm text-gray-500">Master Flow</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantList;
