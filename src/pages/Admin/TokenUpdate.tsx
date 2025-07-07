import React, { useState } from 'react';
import { Search, Plus, Minus, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import type { User } from '../../types';

// Mock data - replace with actual API call
const mockMerchants: User[] = [
  {
    _id: '1',
    email: 'merchant1@example.com',
    username: 'TechStore',
    name: 'Tech Store Owner',
    status: true,
    role: 'merchant',
    flow: 'master',
    createdAt: '2024-01-15T00:00:00.000Z',
    totalTokens: 5000,
  },
  {
    _id: '2',
    email: 'merchant2@example.com',
    username: 'ShopEasy',
    name: 'Shop Easy Owner',
    status: false,
    role: 'merchant',
    flow: 'forwarder',
    createdAt: '2024-01-20T00:00:00.000Z',
    totalTokens: 3200,
  },
  {
    _id: '3',
    email: 'merchant3@example.com',
    username: 'DigitalMart',
    name: 'Digital Mart Owner',
    status: true,
    role: 'merchant',
    flow: 'master',
    createdAt: '2024-02-01T00:00:00.000Z',
    totalTokens: 7500,
  },
];

const TokenUpdate = () => {
  const [merchants, setMerchants] = useState<User[]>(mockMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState<string>('');
  const [operation, setOperation] = useState<'increase' | 'decrease'>('increase');
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const filteredMerchants = merchants.filter(merchant =>
    merchant.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMerchantData = merchants.find(m => m._id === selectedMerchant);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMerchant || !amount || !reason) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    if (operation === 'decrease' && selectedMerchantData && amount > selectedMerchantData.totalTokens!) {
      setMessage({ type: 'error', text: 'Cannot decrease more tokens than available' });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update merchant tokens locally
      setMerchants(prev => prev.map(merchant => {
        if (merchant._id === selectedMerchant) {
          const currentTokens = merchant.totalTokens || 0;
          const newTokens = operation === 'increase' 
            ? currentTokens + amount 
            : currentTokens - amount;
          return { ...merchant, totalTokens: Math.max(0, newTokens) };
        }
        return merchant;
      }));

      setMessage({ 
        type: 'success', 
        text: `Successfully ${operation === 'increase' ? 'added' : 'removed'} ${amount.toLocaleString()} tokens ${operation === 'increase' ? 'to' : 'from'} ${selectedMerchantData?.username}` 
      });

      // Reset form
      setSelectedMerchant('');
      setAmount(0);
      setReason('');
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update tokens. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear message after 5 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Token Management</h1>
          <p className="text-gray-600">Increase or decrease token counts for merchants</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-3" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-3" />
            )}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Token Update Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Tokens</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Merchant Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Merchant *
                </label>
                <select
                  value={selectedMerchant}
                  onChange={(e) => setSelectedMerchant(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a merchant...</option>
                  {filteredMerchants.map((merchant) => (
                    <option key={merchant._id} value={merchant._id}>
                      {merchant.username} ({merchant.email}) - {merchant.totalTokens?.toLocaleString() || 0} tokens
                    </option>
                  ))}
                </select>
              </div>

              {/* Current Tokens Display */}
              {selectedMerchantData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">
                      Current Tokens: {selectedMerchantData.totalTokens?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              )}

              {/* Operation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operation *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOperation('increase')}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                      operation === 'increase'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Increase
                  </button>
                  <button
                    type="button"
                    onClick={() => setOperation('decrease')}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-colors ${
                      operation === 'decrease'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Decrease
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <input
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  min="1"
                  max={operation === 'decrease' && selectedMerchantData ? selectedMerchantData.totalTokens : undefined}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter token amount"
                  required
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason *
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reason for token update..."
                  required
                />
              </div>

              {/* Preview */}
              {selectedMerchantData && amount > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Preview:</h4>
                  <div className="text-sm text-gray-600">
                    <div>Merchant: {selectedMerchantData.username}</div>
                    <div>Current: {selectedMerchantData.totalTokens?.toLocaleString() || 0} tokens</div>
                    <div className={operation === 'increase' ? 'text-green-600' : 'text-red-600'}>
                      {operation === 'increase' ? '+' : '-'}{amount.toLocaleString()} tokens
                    </div>
                    <div className="font-medium">
                      New Total: {operation === 'increase' 
                        ? ((selectedMerchantData.totalTokens || 0) + amount).toLocaleString()
                        : Math.max(0, (selectedMerchantData.totalTokens || 0) - amount).toLocaleString()
                      } tokens
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || !selectedMerchant || !amount || !reason}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                  isProcessing || !selectedMerchant || !amount || !reason
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : operation === 'increase'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {operation === 'increase' ? (
                      <Plus className="h-4 w-4 mr-2" />
                    ) : (
                      <Minus className="h-4 w-4 mr-2" />
                    )}
                    {operation === 'increase' ? 'Increase' : 'Decrease'} Tokens
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Merchant List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Merchants</h2>
            
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search merchants..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Merchant List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMerchants.map((merchant) => (
                <div
                  key={merchant._id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedMerchant === merchant._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMerchant(merchant._id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{merchant.username}</div>
                      <div className="text-sm text-gray-500">{merchant.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {merchant.totalTokens?.toLocaleString() || 0}
                      </div>
                      <div className="text-sm text-gray-500">tokens</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenUpdate;
