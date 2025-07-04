import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Search, Filter, ArrowLeft } from "lucide-react";

import { useGetInvoice } from "../../api/queries/useGetInvoice";
import { useGetAddress } from "../../api/queries/useGetAddress";
import { useGetInvoicePayments } from "../../api/queries/useGetInvoicePayments";
import type { PaymentType } from "../../types";
import { useGetTransaction } from "../../api/queries/useGetTransaction";

const ProductInvoiceDetails = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const { data: invoice, isLoading } = useGetInvoice(invoiceId ?? "");

  if (!invoiceId) {
    return <div></div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08B882]"></div>
      </div>
    );
  }
  
  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Invalid invoice id...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-[#08B882] transition-colors mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </button>

      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Invoice Details</h2>
            <p className="text-gray-300 mt-1">View and manage your invoice information</p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-sm text-[#08B882]">Label: {invoice.label}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg p-6 border border-gray-100">
        <div className="space-y-6">
          {/* Invoice Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Invoice Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Detail</p>
                <p className="text-gray-900">{invoice.detail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <AddressDiv addressId={invoice.address} />
              </div>
            </div>
          </div>

          {/* Payments Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Payments</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
                <div className="relative">
                  <input
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                    placeholder="Search payments..."
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            <Table invoiceId={invoiceId ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressDiv = ({ addressId }: { addressId: string }) => {
  const { data: address, isLoading } = useGetAddress(addressId);

  if (isLoading) return <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>;
  if (!address) return <div className="text-red-500">Address not found...</div>;

  return <p className="text-gray-900">{address.address}</p>;
};

const Table = ({ invoiceId }: { invoiceId: string }) => {
  const { data: payments } = useGetInvoicePayments(invoiceId ?? "");
  const [show, setShow] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState<PaymentType | null>(null);

  const viewDetail = (payment: PaymentType) => {
    setPaymentDetail(payment);
    setShow(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tx Hash</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments ? (
            payments.map((payment) => (
              <PaymentRow
                payment={payment}
                viewDetail={() => viewDetail(payment)}
                key={payment._id}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No payments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {show && (
        <PaymentDetailModal
          show={show}
          setShow={setShow}
          payment={paymentDetail}
          setPayment={setPaymentDetail}
        />
      )}
    </div>
  );
};

const PaymentDetailModal = ({
  payment,
  setPayment,
  show,
  setShow,
}: {
  payment: PaymentType | null;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setPayment: Dispatch<SetStateAction<PaymentType | null>>;
}) => {
  const { data: transaction, isPending } = useGetTransaction(payment?.tx ?? "");

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transaction Details</h2>
          <button
            onClick={() => {
              setShow(false);
              setPayment(null);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          {isPending && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08B882]"></div>
            </div>
          )}
          {transaction && (
            <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(JSON.parse(transaction.txObject), null, 2)}
            </pre>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setShow(false);
              setPayment(null);
            }}
            className="px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a474] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentRow = ({
  payment,
  viewDetail,
}: {
  viewDetail: () => void;
  payment: PaymentType;
}) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.from}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {payment.txHash.substring(0, 5)}...
        {payment.txHash.substring(payment.txHash.length - 5)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={viewDetail}
          className="text-[#08B882] hover:text-[#07a474] transition-colors"
        >
          View Detail
        </button>
      </td>
    </tr>
  );
};

export default ProductInvoiceDetails;