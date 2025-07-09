import React, { useState } from 'react';
import { Search,  Plus, Trash2, Users, AlertCircle, Coins } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetAllTokens } from '../../api/queries/useGetAllTokens';
import { useGetMerchants } from '../../api/queries/useGetMerchants';
import { useDeleteToken, useCreateToken, useAssignTokenToMerchant } from '../../api/mutations';
import type { TokenType } from '../../types';

const TokenList = () => {
  const { data: tokens, isLoading, error } = useGetAllTokens();
  const { data: merchants } = useGetMerchants();
  const deleteTokenMutation = useDeleteToken();
  const createTokenMutation = useCreateToken();
  const assignTokenMutation = useAssignTokenToMerchant();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);
  const [deletingTokenId, setDeletingTokenId] = useState<string | null>(null);

  // Form states
  const [createForm, setCreateForm] = useState({
    name: '',
    symbol: '',
    decimals: 18,
    chainId: '',
    address: ''
  });
  const [assignForm, setAssignForm] = useState({
    merchant_id: ''
  });

  const filteredTokens = (tokens || []).filter(token => {
    if (!token || typeof token !== 'object') return false;
    
    const matchesSearch = token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createForm.name || !createForm.symbol || !createForm.address || !createForm.chainId) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic validation
    if (createForm.decimals < 0 || createForm.decimals > 18) {
      toast.error('Decimals must be between 0 and 18');
      return;
    }

    try {
      await createTokenMutation.mutateAsync({
        name: createForm.name.trim(),
        symbol: createForm.symbol.trim().toUpperCase(),
        decimals: createForm.decimals,
        chainId: createForm.chainId.trim(),
        address: createForm.address.trim()
      });
      toast.success('Token created successfully');
      setShowCreateModal(false);
      setCreateForm({
        name: '',
        symbol: '',
        decimals: 18,
        chainId: '',
        address: ''
      });
    } catch (error: any) {
      console.error('Error creating token:', error);
      
      // Extract more detailed error message
      let errorMessage = 'Failed to create token';
      if (error?.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (!confirm('Are you sure you want to delete this token? This action cannot be undone.')) {
      return;
    }

    setDeletingTokenId(tokenId);
    
    try {
      await deleteTokenMutation.mutateAsync(tokenId);
      toast.success('Token deleted successfully');
    } catch (error: any) {
      console.error('Error deleting token:', error);
      toast.error(error?.message || 'Failed to delete token');
    } finally {
      setDeletingTokenId(null);
    }
  };

  const handleAssignToken = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedToken || !assignForm.merchant_id) {
      toast.error('Please select a merchant');
      return;
    }

    try {
      await assignTokenMutation.mutateAsync({
        token_id: selectedToken._id,
        merchant_id: assignForm.merchant_id
      });
      toast.success('Token assigned to merchant successfully');
      setShowAssignModal(false);
      setSelectedToken(null);
      setAssignForm({ merchant_id: '' });
    } catch (error: any) {
      console.error('Error assigning token:', error);
      toast.error(error?.message || 'Failed to assign token to merchant');
    }
  };

  const openAssignModal = (token: TokenType) => {
    setSelectedToken(token);
    setShowAssignModal(true);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded-md w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-96 animate-pulse"></div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-500">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading token data...
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
              <h2 className="text-lg font-semibold text-red-800">Error loading tokens</h2>
            </div>
            <div className="text-red-700 mb-4">
              {error.message || 'An unexpected error occurred. Please try again.'}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Token Management</h1>
              <p className="text-gray-600">Manage blockchain tokens, their properties, and merchant assignments</p>
            </div>
            <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
              <Coins className="h-4 w-4 mr-2" />
              {filteredTokens.length} Tokens
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tokens by name, symbol, or address..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Token
              </button>
            </div>
          </div>
        </div>

        {/* Tokens Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredTokens.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Token Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Decimals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chain ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contract Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTokens.map((token) => (
                    <tr key={token._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {token.symbol?.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {token.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {token._id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {token.symbol}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {token.decimals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {token.chainId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-mono">
                          {token.address?.slice(0, 6)}...{token.address?.slice(-6)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Click to copy full address
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openAssignModal(token)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                            title="Assign to Merchant"
                          >
                            <Users className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteToken(token._id)}
                            disabled={deletingTokenId === token._id}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                            title="Delete Token"
                          >
                            {deletingTokenId === token._id ? (
                              <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Coins className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tokens found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first token.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Token
                </button>
              )}
            </div>
          )}
        </div>

        {/* Create Token Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Token</h2>
              
              <form onSubmit={handleCreateToken}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Token Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                      placeholder="e.g., Ethereum"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Symbol *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={createForm.symbol}
                      onChange={(e) => setCreateForm({...createForm, symbol: e.target.value.toUpperCase()})}
                      placeholder="e.g., ETH"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Decimals
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="18"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={createForm.decimals}
                      onChange={(e) => setCreateForm({...createForm, decimals: parseInt(e.target.value) || 18})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chain ID *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={createForm.chainId}
                      onChange={(e) => setCreateForm({...createForm, chainId: e.target.value})}
                      placeholder="e.g., 1 (Ethereum Mainnet)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contract Address *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={createForm.address}
                      onChange={(e) => setCreateForm({...createForm, address: e.target.value})}
                      placeholder="0x..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createTokenMutation.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {createTokenMutation.isPending ? 'Creating...' : 'Create Token'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assign Token Modal */}
        {showAssignModal && selectedToken && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Assign Token to Merchant
              </h2>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Token:</strong> {selectedToken.name} ({selectedToken.symbol})
                </p>
              </div>

              <form onSubmit={handleAssignToken}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Merchant *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={assignForm.merchant_id}
                    onChange={(e) => setAssignForm({...assignForm, merchant_id: e.target.value})}
                  >
                    <option value="">Choose a merchant...</option>
                    {merchants?.filter(m => m.role === 'merchant').map((merchant) => (
                      <option key={merchant._id} value={merchant._id}>
                        {merchant.name || merchant.username} ({merchant.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedToken(null);
                      setAssignForm({merchant_id: ''});
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assignTokenMutation.isPending}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {assignTokenMutation.isPending ? 'Assigning...' : 'Assign Token'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenList; 