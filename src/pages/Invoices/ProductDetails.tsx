import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Download, Share, MoreHorizontal } from 'lucide-react';

interface ProductDetails {
  id: string;
  label: string;
  status: string;
  category: string;
  startedAt: string;
  endAt: string;
  payments: number;
  amount?: number;
  invoiceNumber?: string;
  customer?: string;
  description?: string;
  createdDate?: string;
  dueDate?: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from an API call based on the id
  const productDetails: ProductDetails = {
    id: id || '1',
    label: 'Some label',
    status: 'Active',
    category: 'FLEXIBLE',
    startedAt: '19/01/2025 11:02',
    endAt: '-',
    payments: 0,
    amount: 10,
    invoiceNumber: '15f3ae6b-9443-450b-A674-B3848685aaaf',
    customer: 'saqibkaml@gmail.com',
    description: 'Product subscription service',
    createdDate: 'Feb 06, 2025, 01:16am',
    dueDate: 'Feb 11, 2025'
  };

  const handleBack = () => {
    navigate(-1);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-[20px] p-6 mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-3xl font-semibold font-dashboardmenu">Product Details</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center px-4 py-2 bg-[#08B882] text-white rounded-full hover:bg-emerald-600 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="p-2 text-white hover:text-gray-300">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Primary Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Primary Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Label:</span>
                  <span className="text-gray-900">{productDetails.label}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(productDetails.status)}`}>
                    {productDetails.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="text-gray-900">{productDetails.category}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Payments:</span>
                  <span className="text-gray-900 font-semibold">{productDetails.payments}</span>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-4">
                {productDetails.amount && (
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Amount:</span>
                    <span className="text-gray-900 font-semibold">${productDetails.amount}</span>
                  </div>
                )}
                
                {productDetails.customer && (
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Customer:</span>
                    <a 
                      href={`mailto:${productDetails.customer}`} 
                      className="text-emerald-500 hover:text-emerald-600 transition-colors"
                    >
                      {productDetails.customer}
                    </a>
                  </div>
                )}
                
                {productDetails.description && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700 block mb-2">Description:</span>
                    <span className="text-gray-900">{productDetails.description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Started At:</span>
                  <span className="text-gray-900">{productDetails.startedAt}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">End At:</span>
                  <span className="text-gray-900">{productDetails.endAt}</span>
                </div>
                
                {productDetails.createdDate && (
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Created:</span>
                    <span className="text-gray-900">{productDetails.createdDate}</span>
                  </div>
                )}
                
                {productDetails.dueDate && (
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Due Date:</span>
                    <span className="text-gray-900">{productDetails.dueDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Information</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 block mb-2">Product ID:</span>
                  <span className="text-gray-900 font-mono text-sm break-all">{productDetails.id}</span>
                </div>
                
                {productDetails.invoiceNumber && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700 block mb-2">Invoice Number:</span>
                    <span className="text-gray-900 font-mono text-sm break-all">{productDetails.invoiceNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-[#08B882] text-white rounded-lg hover:bg-emerald-600 transition-colors">
              Mark as Paid
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Send Reminder
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Duplicate
            </button>
            <button className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 