import  { useState } from 'react';

const AllBalances = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const currencies = ['USD', 'EUR', 'GBP'];

  return (
    <div className="py-6">
      <div className="bg-[#f8f9fa] rounded-lg p-6 mb-8">
        <div className="text-sm text-[#637381] mb-2">Balances</div>
        <div className="text-3xl font-semibold text-[#1a1a1a] mb-4">$ 123,987</div>
        <div className="flex justify-between items-center">
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-40 px-4 py-2 bg-[#1a1a1a] text-white rounded appearance-none cursor-pointer focus:outline-none"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
          
          <button className="bg-[#00A76F] text-white px-6 h-10 rounded flex items-center gap-2 hover:bg-[#008f5d] transition-colors">
            Export
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16">
        <img src="/empty-transaction.svg" alt="No transactions" className="w-30 h-30 mb-6" />
        <div className="text-base text-[#637381]">Your transaction history will be shown here</div>
      </div>
    </div>
  );
};

export default AllBalances; 