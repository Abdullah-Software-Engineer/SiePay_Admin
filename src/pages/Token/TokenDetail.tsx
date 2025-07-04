import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, ExternalLink, Copy, X } from 'lucide-react';
import { useGetToken } from '../../api/queries/useGetToken';
import { useGetMyAddresses } from '../../api/queries/useGetAddresses';
import { useEffect, useState } from 'react';
import Web3 from "web3";
import ERC20_ABI from "../../utils/abis/erc20.json";
import type { AddressType } from '../../types';
import * as Yup from 'yup';
import { useWithdrawToken } from '../../api/mutations/useWithdrawTokens';



const useGetWithdrawHistory = (_tokenId: string) => ({
  data: [
    { amount: '100.5', txHash: '0x1234567890abcdef1234567890abcdef12345678' },
    { amount: '50.0', txHash: '0xabcdef1234567890abcdef1234567890abcdef12' },
  ]
});

// Validation schema for withdraw form
const WithdrawSchema = (maxAmount: number) => Yup.object({
  withdraw_amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(maxAmount, `Maximum amount is ${maxAmount}`),
  toAddress: Yup.string()
    .required('Destination address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid address format')
});

const getBalances = async (
  addresses: AddressType[],
  tokenAddress: string,
  setBalances: (a: any) => void
) => {
  const web3 = new Web3("https://bsc-testnet-rpc.publicnode.com");
  const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
  const decimals: any = await contract.methods.decimals().call();
  const balances = [];
  for (let i = 0; i < addresses.length; i++) {
    const b: any = await contract.methods
      .balanceOf(addresses[i].address)
      .call();
    balances.push(parseInt(b) / 10 ** parseInt(decimals));
  }
  setBalances(balances);
};

// Withdraw Modal Component
const WithdrawModal = ({
  show,
  setShow,
  totalBalance,
  tokenId,
  tokenSymbol
}: {
  show: boolean;
  setShow: (a: boolean) => void;
  totalBalance: number;
  tokenId: string;
  tokenSymbol: string;
}) => {
  const mutation = useWithdrawToken();
  const [formData, setFormData] = useState({
    withdraw_amount: '',
    toAddress: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const schema = WithdrawSchema(totalBalance);
      const validData = await schema.validate({
        withdraw_amount: Number(formData.withdraw_amount),
        toAddress: formData.toAddress
      });

      await mutation.mutateAsync({
        tokenId,
        amount: validData.withdraw_amount,
        to: validData.toAddress,
      });

      alert('Withdrawal successful!');
      setShow(false);
      setFormData({ withdraw_amount: '', toAddress: '' });
    } catch (error: any) {
      if (error.path) {
        setErrors({ [error.path]: error.message });
      } else {
        alert('Withdrawal failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Withdraw Tokens</h2>
          <button
            onClick={() => setShow(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              Available Balance: {totalBalance} {tokenSymbol}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Withdraw
            </label>
            <input
              type="number"
              step="any"
              value={formData.withdraw_amount}
              onChange={(e) => setFormData({ ...formData, withdraw_amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
              placeholder="Enter amount"
            />
            {errors.withdraw_amount && (
              <div className="text-red-500 text-sm mt-1">{errors.withdraw_amount}</div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Address
            </label>
            <input
              type="text"
              value={formData.toAddress}
              onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
              placeholder="0x..."
            />
            {errors.toAddress && (
              <div className="text-red-500 text-sm mt-1">{errors.toAddress}</div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a374] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Withdraw History Table Component
const WithdrawHistoryTable = ({ tokenId }: { tokenId: string }) => {
  const { data } = useGetWithdrawHistory(tokenId);
  
  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Withdrawal History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Transaction Hash</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction, index) => (
              <tr key={transaction.txHash} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="py-4 px-6">
                  <span className="font-semibold text-gray-900">{transaction.amount}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                      {truncateHash(transaction.txHash)}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.txHash)}
                      className="text-gray-400 hover:text-[#08B882] transition-colors"
                      title="Copy transaction hash"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button className="text-[#08B882] hover:text-[#07a374] transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(!data || data.length === 0) && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">No withdrawal history found</div>
          <div className="text-sm text-gray-400">Withdrawal transactions will appear here</div>
        </div>
      )}
    </div>
  );
};

const TokenDetail = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const { data: token, isLoading } = useGetToken(tokenId ?? "");
  const { data: addresses } = useGetMyAddresses();
  const [balances, setBalances] = useState<number[]>([]);

  useEffect(() => {
    if (addresses && token) {
      getBalances(addresses, token.address, setBalances);
    }
  }, [addresses, token]);

  if (!tokenId) {
    return <div></div>;
  }
  if (isLoading) {
    return <div>...Loading...</div>;
  }
  if (!token) {
    return <div>Invalid token id...</div>;
  }

  if (!addresses) {
    return <div>No Addresses...</div>;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '1':
        return 'bg-yellow-100 text-yellow-800';
      case '2':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case '1':
        return 'Unused';
      case '2':
        return 'In Use';
      default:
        return 'Unknown';
    }
  };

  const totalBalance = balances.reduce((sum, balance) => sum + balance, 0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/token')}
        className="flex items-center text-gray-600 hover:text-[#08B882] transition-colors mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Tokens
      </button>

      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-[#08B882] to-[#06d1a3] text-white rounded-2xl p-8 mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            {token.name} ({token.symbol})
          </h1>
        </div>
      </div>

      {/* Token Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Chain ID</h3>
          <p className="text-2xl font-bold text-[#08B882]">{token.chainId}</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Balance</h3>
          <p className="text-2xl font-bold text-gray-900">{totalBalance.toFixed(4)} {token.symbol}</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 flex items-center justify-center">
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Addresses Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Address</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Balance</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">View</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address, index) => (
                <tr key={address._id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                        {truncateAddress(address.address)}
                      </code>
                      <button
                        onClick={() => copyToClipboard(address.address)}
                        className="text-gray-400 hover:text-[#08B882] transition-colors"
                        title="Copy address"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">
                      {balances[index]?.toFixed(4) || '0.0000'} {token.symbol}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(address.status)}`}>
                      {getStatusText(address.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      onClick={() => navigate(`/dashboard/address/${address._id}`)}
                      className="text-[#08B882] hover:text-[#07a374] transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw History Table */}
      <WithdrawHistoryTable tokenId={token._id} />

      {/* Withdraw Modal */}
      <WithdrawModal
        show={showWithdrawModal}
        setShow={setShowWithdrawModal}
        totalBalance={totalBalance}
        tokenId={token._id}
        tokenSymbol={token.symbol}
      />
    </div>
  );
};

export default TokenDetail; 