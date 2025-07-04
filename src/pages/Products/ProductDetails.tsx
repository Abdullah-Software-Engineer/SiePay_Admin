import { useParams, useNavigate } from "react-router-dom";
import { useGetStoreInvoices } from "../../api/queries/useGetStoreInvoices";
import { ArrowLeft, Eye, Settings, Key, FileText, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import GenerateInvoiceModal from "../../components/GenerateInvoiceModal";
import { useGenerateStoreKey } from "../../api/mutations/useGenerateStoreKey";
import { useGetStoreKey } from "../../api/queries/useGetStoreKey";
import { useGetMyStore } from "../../api/queries/useGetStore";

// Date formatting utility
const getDateTime = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString || "N/A";
  }
};

const ProductDetails = () => {
  const { productId } = useParams();

  const mutation = useGenerateStoreKey(productId ?? "");

  const { data: productData } = useGetMyStore(productId ?? "");
  const { data: storeKey } = useGetStoreKey(productId ?? "");


  const navigate = useNavigate();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handleGenerateKey = () => {
    mutation.mutate();
  };

  const handleGenerateInvoice = () => {
    setIsInvoiceModalOpen(true);
  };

  const copyKey = () => {
    if (storeKey) {
      navigator.clipboard.writeText(storeKey);
      // You might want to add a toast notification here
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back Button & Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-[#08B882] transition-colors mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      {/* Header with Gradient Background */}
      <div className="bg-[#001939] text-white rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Product Details</h2>
            <p className="text-gray-300 mt-1">
              View detailed information and settings for this product
            </p>
          </div>
          <div className="flex items-center gap-3">
            {storeKey ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                <Key size={18} className="text-blue-600" />
                <span
                  className="cursor-pointer text-gray-700 font-mono text-sm"
                  onClick={copyKey}
                  title="Click to copy full key"
                >
                  Keys: ***********{storeKey.slice(storeKey.length - 4)}
                </span>
                <button
                  onClick={copyKey}
                  className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy key"
                >
                  <Copy size={14} className="text-gray-600" />
                </button>
                <button
                  className="ml-1 p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Delete key"
                >
                  <Trash2 size={14} className="text-red-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGenerateKey}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Key size={18} />
                Generate Key
              </button>
            )}
            <button
              onClick={handleGenerateInvoice}
              className="flex items-center gap-2 px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a374] transition-colors font-medium"
            >
              <FileText size={18} />
              Generate Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border-4 border-[#001939] overflow-hidden shadow-sm">
        <Table productData={productData} productId={productId ?? ""} />
      </div>

      {/* Generate Invoice Modal */}
      <GenerateInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        productId={productId ?? ""}
      />
    </div>
  );
};

const Table = ({ productData, productId }: { productData: any, productId: string }) => {
  const { data: product, isLoading } = useGetStoreInvoices(productId ?? "");
  const navigate = useNavigate();

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-green-100 text-green-800";
      case false:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || !productData) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08B882] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Product Not Found
          </h3>
          <p className="text-gray-500 mb-4">
            The requested product could not be found.
          </p>
          <button
            onClick={() => navigate("/dashboard/products")}
            className="inline-flex items-center px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a374] transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Label
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Started At
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End At
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payments
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {product.map((detail, index) => (
              <tr
                key={detail._id}
                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {detail.label}
                  </div>

                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      detail.status
                    )}`}
                  >
                    {detail.status ? "Active" : "Inactive"} {detail.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {detail.category}
                  </div>
                  <div className="text-xs text-gray-500">Category Type</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getDateTime(detail.startedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {detail.endAt ? getDateTime(detail.endAt) : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[#08B882] text-white text-xs font-medium mr-2">
                      {detail.payments.length}
                    </span>
                    <span className="text-sm text-gray-500">total</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => navigate(`/dashboard/product/invoice/${detail._id}`)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#08B882] text-white rounded-lg hover:bg-[#07a374] transition-colors text-sm"
                  >
                    <Settings size={14} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Product Information */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Product ID
            </h4>
            <p className="text-sm text-gray-900 font-mono break-all">
              {productId}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Callback URL
            </h4>
            <p className="text-sm text-gray-900 break-all">
              {productData?.callback_url || "Not configured"}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Description
            </h4>
            <p className="text-sm text-gray-900">
              {productData?.desc || "No description provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
