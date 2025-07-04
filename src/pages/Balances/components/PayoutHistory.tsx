
const columns = [
  { id: 'payoutAccount', label: 'Payout Account' },
  { id: 'status', label: 'Status' },
  { id: 'amount', label: 'Amount' },
  { id: 'fee', label: 'Fee' },
  { id: 'currency', label: 'Currency' },
  { id: 'createdAt', label: 'Created At' },
];

const PayoutHistory = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-[#1a1a1a] m-0">Payouts History</h2>
        <button className="bg-[#00A76F] text-white px-6 h-10 rounded hover:bg-[#008f5d] transition-colors">
          Payout Settings
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-16">
        <img src="/empty-transaction.svg" alt="No data" className="w-30 h-30 mb-6" />
        <div className="text-base text-[#637381]">No Data</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map(column => (
                <th 
                  key={column.id}
                  className="text-left py-4 px-6 text-[#637381] font-medium border-b border-[#f0f0f0] bg-transparent"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Empty tbody for now */}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button 
          disabled 
          className="px-3 py-1 rounded border border-[#d9d9d9] text-[#00000040] bg-[#f5f5f5] cursor-not-allowed"
        >
          Previous
        </button>
        {[1, 2, 3, 4, '...', 32].map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              page === 1
                ? 'bg-[#00A76F] text-white'
                : 'border border-[#d9d9d9] hover:border-[#00A76F] hover:text-[#00A76F]'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="px-3 py-1 rounded border border-[#d9d9d9] hover:border-[#00A76F] hover:text-[#00A76F]">
          Next
        </button>
      </div>
    </div>
  );
};

export default PayoutHistory; 