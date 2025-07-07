import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Save, X, Power, Users, DollarSign, Calendar } from 'lucide-react';
import type { MerchantType, MerchantUpdateType } from '../../types';

// Mock data - replace with actual API call
const mockMerchant: MerchantType = {
  _id: '1',
  email: 'merchant1@example.com',
  username: 'TechStore',
  status: true,
  flow: 'master',
  createdAt: '2024-01-15',
  totalTokens: 10000,
  stores: [
    { _id: '1', name: 'Main Store', desc: 'Primary store for tech products', callback_url: 'https://techstore.com/callback' },
    { _id: '2', name: 'Mobile Store', desc: 'Mobile app store', callback_url: 'https://mobile.techstore.com/callback' },
  ],
};

const MerchantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState<MerchantType>(mockMerchant);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<MerchantUpdateType>({
    status: merchant.status,
    flow: merchant.flow,
  });

  const handleSave = () => {
    // This would be an API call to update merchant
    setMerchant(prev => ({
      ...prev,
      status: editForm.status ?? prev.status,
      flow: editForm.flow ?? prev.flow,
    }));
    setIsEditing(false);
    console.log('Updated merchant:', id, editForm);
  };

  const handleCancel = () => {
    setEditForm({
      status: merchant.status,
      flow: merchant.flow,
    });
    setIsEditing(false);
  };

  const toggleStatus = () => {
    const newStatus = !merchant.status;
    setMerchant(prev => ({ ...prev, status: newStatus }));
    console.log('Toggle merchant status:', id, newStatus);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard/admin/merchants')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Merchant List
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Merchant Details</h1>
              <p className="text-gray-600">Manage merchant information and settings</p>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={toggleStatus}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      merchant.status
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <Power className="h-4 w-4 mr-2" />
                    {merchant.status ? 'Disable' : 'Enable'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">{merchant.totalTokens?.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Tokens</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">{merchant.stores?.length || 0}</div>
                <div className="text-sm text-gray-500">Active Stores</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.floor((Date.now() - new Date(merchant.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-gray-500">Days Active</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-center h-full">
              <span
                className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${
                  merchant.status
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {merchant.status ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Merchant Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Merchant Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="p-3 bg-gray-50 border rounded-lg">
                {merchant.username}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="p-3 bg-gray-50 border rounded-lg">
                {merchant.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              {isEditing ? (
                <select
                  value={editForm.status ? 'active' : 'inactive'}
                  onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value === 'active' }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              ) : (
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      merchant.status
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {merchant.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flow Type</label>
              {isEditing ? (
                <select
                  value={editForm.flow}
                  onChange={(e) => setEditForm(prev => ({ ...prev, flow: e.target.value as 'master' | 'forward' }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="master">Master</option>
                  <option value="forward">Forward</option>
                </select>
              ) : (
                <div className="p-3 bg-gray-50 border rounded-lg">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      merchant.flow === 'master'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {merchant.flow.charAt(0).toUpperCase() + merchant.flow.slice(1)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <div className="p-3 bg-gray-50 border rounded-lg">
                {new Date(merchant.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Merchant ID</label>
              <div className="p-3 bg-gray-50 border rounded-lg font-mono text-sm">
                {merchant._id}
              </div>
            </div>
          </div>
        </div>

        {/* Stores */}
        {merchant.stores && merchant.stores.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Associated Stores</h2>
            <div className="space-y-4">
              {merchant.stores.map((store) => (
                <div key={store._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{store.desc}</p>
                      <p className="text-xs text-gray-500 mt-2 font-mono">{store.callback_url}</p>
                    </div>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantDetail;
