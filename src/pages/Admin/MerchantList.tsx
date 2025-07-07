import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Power, Store, AlertCircle, User as UserIcon } from 'lucide-react';
import { useGetMerchants } from '../../api/queries/useGetMerchants';
import { useGetUser } from '../../api/queries/useGetUser';

const MerchantList = () => {
  // Use the real API hook
  const { data: merchants, isLoading, error } = useGetMerchants();
  const { data: currentUser } = useGetUser();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [flowFilter, setFlowFilter] = useState<'all' | 'master' | 'forwarder'>('all');
  const navigate = useNavigate();

  const filteredMerchants = (merchants || []).filter(merchant => {
    // Safety check for merchant object
    if (!merchant || typeof merchant !== 'object') {
      return false;
    }
    
    const matchesSearch = merchant.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.name?.toLowerCase().includes(searchTerm.toLowerCase());
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

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded-md w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-96 animate-pulse"></div>
          </div>

          {/* Filters Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading merchant data...
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  This may take a few moments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-lg font-semibold text-red-800">Error loading merchants</h2>
            </div>
            <div className="text-red-700 mb-4">
              {error.message || 'An unexpected error occurred. Please try again.'}
            </div>
            
            {/* Show additional help based on error type */}
            {error.message?.includes('unauthorized') || error.message?.includes('Access denied') ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="text-yellow-800">
                  <strong>Authentication Required:</strong> You need to be logged in as an admin to access this page.
                  <br />
                  <span className="text-sm">Please logout and login again with admin credentials.</span>
                </div>
              </div>
            ) : error.message?.includes('Network') ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="text-blue-800">
                  <strong>Connection Issue:</strong> Please check your internet connection and try again.
                </div>
              </div>
            ) : error.message?.includes('Session expired') ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
                <div className="text-orange-800">
                  <strong>Session Expired:</strong> Your login session has expired. Please login again.
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                <div className="text-gray-700 text-sm">
                  If this problem persists, please contact support with the error details above.
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
              {(error.message?.includes('unauthorized') || error.message?.includes('Session expired')) && (
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Go to Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Merchant Management</h1>
              <p className="text-gray-600">Manage merchant users, their status, flow settings, and stores</p>
            </div>
            {currentUser?.role === 'admin' && (
              <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                <UserIcon className="h-4 w-4 mr-2" />
                Admin Access
              </div>
            )}
          </div>
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
                  placeholder="Search merchants by name, username, or email..."
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
                <option value="forwarder">Forwarder</option>
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
                    Merchant User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
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
                  <tr key={merchant._id || Math.random()} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">
                            {merchant.username || merchant.name || merchant.email || 'N/A'}
                          </div>
                          <Store className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-500">{merchant.email || 'No email'}</div>
                        {merchant.name && merchant.name !== merchant.username && (
                          <div className="text-xs text-gray-400">{merchant.name}</div>
                        )}
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
                      {merchant.flow ? (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            merchant.flow === 'master'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {merchant.flow.charAt(0).toUpperCase() + merchant.flow.slice(1)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Not set</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {merchant.role || 'merchant'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {merchant.createdAt ? new Date(merchant.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(merchant._id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="View Details"
                          disabled={!merchant._id}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleMerchantStatus(merchant._id)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                          title="Toggle Status"
                          disabled={!merchant._id}
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{merchants?.length || 0}</div>
            <div className="text-sm text-gray-500">Total Merchants</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">
              {merchants?.filter(m => m.status).length || 0}
            </div>
            <div className="text-sm text-gray-500">Active Merchants</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-blue-600">
              {merchants?.filter(m => m.flow === 'master').length || 0}
            </div>
            <div className="text-sm text-gray-500">Master Flow</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {merchants?.filter(m => m.flow === 'forwarder').length || 0}
            </div>
            <div className="text-sm text-gray-500">Forwarder Flow</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantList;
