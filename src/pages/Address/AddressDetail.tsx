import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetAddress } from "../../api/queries/useGetAddress";
import { useGetAddressInvoices } from "../../api/queries/useGetAddressInvoices";
import { useGetAddressTransactions } from "../../api/queries/useGetAddressTxs";
import { useGetAddressPayments } from "../../api/queries/useGetAddressPayments";
import { useGetTransaction } from "../../api/queries/useGetTransaction";
import type { PaymentType, TransactionType } from "../../types";



const getDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

const AddressDetail = () => {
  const { addressId } = useParams();

  const { data: address, isLoading } = useGetAddress(addressId ?? "");

  if (!addressId) {
    return <div></div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#08B882]"></div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-xl">
        Invalid address id...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Address Details</h2>
            <p className="text-gray-300 mt-1">
              View detailed information about this address
            </p>
          </div>
          <div className="absolute right-4 top-4">
            <span className="text-sm text-[#08B882]">Fee and limits</span>
          </div>
        </div>
      </div>

      {/* Address Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 break-all">
            {address.address}
          </h1>
          <div className="mt-2 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${address.status === "1"
                ? "bg-[#08B882]/10 text-[#08B882]"
                : "bg-blue-100 text-blue-800"
              }`}>
              {address.status === "1" ? "Unused" : "In use"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payments</h2>
          <PaymentTable addressId={addressId} />
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transactions</h2>
          <TxsTable addressId={addressId} />
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoices</h2>
          <InvoicesTable addressId={addressId} />
        </section>
      </div>
    </div>
  );
};

const InvoicesTable = ({ addressId }: { addressId: string }) => {
  const { data: invoices } = useGetAddressInvoices(addressId ?? "");

  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payments</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices?.map((invoice) => (
            <tr key={invoice._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.label}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${invoice.status
                    ? "bg-[#08B882]/10 text-[#08B882]"
                    : "bg-red-100 text-red-800"
                  }`}>
                  {invoice.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {invoice.category.toUpperCase()}
                {invoice.category === "fixed" && ` - (${invoice.amount})`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getDateTime(invoice.startedAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getDateTime(invoice.endAt ?? '')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.payments.length}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => navigate(`/dashboard/product/invoice/${invoice._id}`)}
                  className="text-[#08B882] hover:text-[#07a474] font-medium"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TxsTable = ({ addressId }: { addressId: string }) => {
  const { data: transactions } = useGetAddressTransactions(addressId ?? "");
  const [show, setShow] = useState(false);
  const [txDetail, setTxDetail] = useState<TransactionType | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tx Hash</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions?.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              transaction={transaction}
              viewDetail={() => {
                setTxDetail(transaction);
                setShow(true);
              }}
            />
          ))}
        </tbody>
      </table>
      {show && (
        <TxDetailModal
          show={show}
          setShow={setShow}
          tx={txDetail}
          setTx={setTxDetail}
        />
      )}
    </div>
  );
};

const PaymentTable = ({ addressId }: { addressId: string }) => {
  const { data: payments } = useGetAddressPayments(addressId ?? "");
  const [show, setShow] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState<PaymentType | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tx Hash</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments?.map((payment) => (
            <PaymentRow
              key={payment._id}
              payment={payment}
              viewDetail={() => {
                setPaymentDetail(payment);
                setShow(true);
              }}
            />
          ))}
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

const TxDetailModal = ({
  tx,
  setTx,
  show,
  setShow,
}: {
  tx: TransactionType | null;
  show: boolean;
  setShow: (show: boolean) => void;
  setTx: (tx: TransactionType | null) => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
          <button
            onClick={() => {
              setShow(false);
              setTx(null);
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {tx && (
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(JSON.parse(tx.txObject), null, 2)}
            </pre>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end">
          <button
            onClick={() => {
              setShow(false);
              setTx(null);
            }}
            className="px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a474] focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
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
  setShow: (show: boolean) => void;
  setPayment: (payment: PaymentType | null) => void;
}) => {
  if (!show) return null;

  const { data: transaction, isPending } = useGetTransaction(payment?.tx ?? "");

 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
          <button
            onClick={() => {
              setShow(false);
              setPayment(null);
            }}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {isPending ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#08B882]"></div>
            </div>
          ) : (
            transaction && (
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(JSON.parse(transaction.txObject), null, 2)}
              </pre>
            )
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end">
          <button
            onClick={() => {
              setShow(false);
              setPayment(null);
            }}
            className="px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a474] focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionRow = ({
  transaction,
  viewDetail,
}: {
  transaction: TransactionType;
  viewDetail: () => void;
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {transaction.txHash.substring(0, 6)}...
        {transaction.txHash.substring(transaction.txHash.length - 6)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={viewDetail}
          className="text-[#08B882] hover:text-[#07a474] font-medium"
        >
          View Detail
        </button>
      </td>
    </tr>
  );
};

const PaymentRow = ({
  payment,
  viewDetail,
}: {
  payment: PaymentType;
  viewDetail: () => void;
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.from}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {payment.txHash.substring(0, 5)}...
        {payment.txHash.substring(payment.txHash.length - 5)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button
          onClick={viewDetail}
          className="text-[#08B882] hover:text-[#07a474] font-medium"
        >
          View Detail
        </button>
      </td>
    </tr>
  );
};

export default AddressDetail; 