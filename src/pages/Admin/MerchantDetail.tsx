import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Shield, Settings, Store, AlertCircle } from 'lucide-react';
import { useGetMerchant } from '../../api/queries/useGetMerchant';
import { useUpdateMerchant } from '../../api/mutations/useUpdateMerchant';
import { useUpdateMerchantFlow } from '../../api/mutations/useUpdateMerchantFlow';
import toast from 'react-hot-toast';

const MerchantDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: merchant, isLoading, error } = useGetMerchant(id || '');
  const updateMerchantMutation = useUpdateMerchant();
  const updateMerchantFlowMutation = useUpdateMerchantFlow();

  const handleUpdateStatus = async () => {
    if (!merchant || !id) return;
    
    try {
      await updateMerchantMutation.mutateAsync({
        merchantId: id,
        status: !merchant.status
      });
      toast.success('Merchant status updated successfully');
    } catch (error) {
      toast.error('Failed to update merchant status');
      console.error('Status update error:', error);
    }
  };

  const handleUpdateFlow = async (newFlow: 'master' | 'forwarder') => {
    if (!merchant || !id) return;
    
    // Check if merchant already has a flow set
    if (merchant.flow) {
      toast.error('Flow is already set and cannot be changed');
      return;
    }
    
    try {
      await updateMerchantFlowMutation.mutateAsync({
        merchantId: id,
        flow: newFlow
      });
      toast.success('Merchant flow updated successfully');
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update merchant flow';
      toast.error(errorMessage);
      console.error('Flow update error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !merchant) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600">Failed to load merchant details</p>
              <button
                onClick={() => navigate('/dashboard/admin/merchants')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Merchants
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard/admin/merchants')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Merchants
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Merchant Details</h1>
          <p className="text-gray-600">Manage merchant user information and settings</p>
        </div>

        {/* Merchant Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {merchant.username || merchant.name || 'N/A'}
                </h2>
                <p className="text-gray-600">{merchant.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Store className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Merchant User</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${merchant.status
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                {merchant.status ? 'Active' : 'Inactive'}
              </span>
              {merchant.flow && (
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${merchant.flow === 'master'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {merchant.flow.charAt(0).toUpperCase() + merchant.flow.slice(1)} Flow
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{merchant.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">{merchant.username || 'N/A'}</p>
                </div>
              </div>

              {merchant.name && (
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900">{merchant.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-900">
                    {merchant.createdAt ? new Date(merchant.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-gray-900">{merchant.role || 'merchant'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Settings className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Flow Type</p>
                  <p className="text-gray-900">
                    {merchant.flow ? merchant.flow.charAt(0).toUpperCase() + merchant.flow.slice(1) : 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Account Status</h4>
                <p className="text-sm text-gray-500">
                  {merchant.status ? 'Merchant account is active' : 'Merchant account is inactive'}
                </p>
              </div>
              <button
                onClick={handleUpdateStatus}
                disabled={updateMerchantMutation.isPending}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${merchant.status
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50'
                    : 'bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50'
                  }`}
              >
                {updateMerchantMutation.isPending ? 'Updating...' : (merchant.status ? 'Deactivate' : 'Activate')}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Flow Configuration</h4>
                <p className="text-sm text-gray-500">
                  Current flow: {merchant.flow ? merchant.flow.charAt(0).toUpperCase() + merchant.flow.slice(1) : 'Not set'}
                </p>
                {merchant.flow && (
                  <div className="flex items-center mt-2 text-amber-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Flow is already set and cannot be changed</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateFlow('master')}
                  disabled={updateMerchantFlowMutation.isPending || !!merchant.flow}
                  className={`px-3 py-1 text-sm font-medium rounded ${merchant.flow === 'master'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                    }`}
                >
                  Master
                </button>
                <button
                  onClick={() => handleUpdateFlow('forwarder')}
                  disabled={updateMerchantFlowMutation.isPending || !!merchant.flow}
                  className={`px-3 py-1 text-sm font-medium rounded ${merchant.flow === 'forwarder'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                    }`}
                >
                  Forwarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetail;
