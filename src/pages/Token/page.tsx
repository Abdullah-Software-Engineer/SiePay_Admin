import { Copy, ExternalLink, Search, Filter, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyTokens } from "../../api/queries/useGetTokens";

const Token = () => {
  const { data } = useGetMyTokens();

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Use the actual API data instead of hardcoded data
  const tokenData = data || [];

  const filteredTokens = tokenData.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleViewDetails = (tokenId: string) => {
    navigate(`/dashboard/token/${tokenId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Token Management</h2>
            <p className="text-gray-300 mt-2">
              Manage and monitor your token portfolio
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <span className="bg-[#08B882]/20 text-[#08B882] px-3 py-1 rounded-full">
                {filteredTokens.length} Tokens
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
              <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </button>
            <div className="flex-1">
              <div className="relative">
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                  placeholder="Search by name, symbol, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Token Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Symbol
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Chain ID
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Decimal
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Address
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map((token, index) => (
                <tr
                  key={token._id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#08B882] to-[#06a374] flex items-center justify-center text-white font-semibold text-sm">
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {token.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {token.symbol}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {token.chainId}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {token.decimal}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                        {truncateAddress(token.address)}
                      </code>
                      <button
                        onClick={() => copyToClipboard(token.address)}
                        className="text-gray-400 hover:text-[#08B882] transition-colors"
                        title="Copy address"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        className="text-gray-400 hover:text-[#08B882] transition-colors"
                        title="View on explorer"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewDetails(token._id)}
                      className="inline-flex items-center px-3 py-1.5 bg-[#08B882] text-white rounded-lg hover:bg-[#07a374] transition-colors text-sm"
                    >
                      <Eye size={14} className="mr-1" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No tokens found</div>
            <div className="text-sm text-gray-400">
              Try adjusting your search terms
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Token;
