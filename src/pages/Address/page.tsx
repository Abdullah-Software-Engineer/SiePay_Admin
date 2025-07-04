import { useNavigate, useParams } from "react-router-dom";
import { useGetMyAddresses } from "../../api/queries/useGetAddresses";
import { useGenerateAddresses } from "../../api/mutations/useGenerateAddresses";
import type { AddressType } from "../../types";
import { useState } from "react";

const Address = () => {
  const { storeId } = useParams();
  const generateAddressMutation = useGenerateAddresses(storeId ?? "");
  const { data } = useGetMyAddresses();
  const [numAddresses, setNumAddresses] = useState(0);

  const handleGenerateAddresses = () => {
    generateAddressMutation.mutate(numAddresses);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Your addresses</h2>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <input
          type="number"
          min={0}
          value={numAddresses}
          onChange={(e) => setNumAddresses(Number(e.target.value))}
          className="w-32 px-4 py-2 rounded-3xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08B882] text-lg"
        />
        <button 
          onClick={handleGenerateAddresses}
          className="bg-[#08B882] text-white px-8 py-2 rounded-3xl font-medium text-lg hover:bg-[#07a374] transition-colors"
        >
          Generate Addresses
        </button>
      </div>

      {/* Table Card */}
      <Table addresses={data ?? []} />
    </div>
  );
};


const Table = ({ addresses }: { addresses: AddressType[] }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-6 border-4 border-[#001939] overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {addresses.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.address}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "1" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {item.status === "1" ? "Unused" : ""}
                  {item.status === "2" ? "In Use" : ""}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button onClick={() => navigate(`/dashboard/address/${item._id}`)} className="bg-[#08B882] text-white px-4 py-1 rounded-lg font-medium hover:bg-[#07a374] transition-colors text-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Address;
