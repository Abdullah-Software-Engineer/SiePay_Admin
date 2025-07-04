
const Payment = () => {
  return (
    <div className="w-full">
      {/* Wallet Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Wallet</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2">Default Wallet Currency</label>
            <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
              <option>USD</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              All Your Payments Will Be Converted Into This Currency Regardless What Currency Your Customer Pays. Go To
              Advanced Setting If You Want To Customise It.
            </p>
          </div>

          <div>
            <button className="text-[#08B882] flex items-center">
              Advanced Setting
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Expiration */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Checkout Expiration</h2>
        
        <div>
          <label className="block text-gray-600 mb-2">Any payments after this time window will not be captured</label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Never</option>
          </select>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
        
        <div className="space-y-4">
          {/* Crypto.com App */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <img src="/assets/icons/crypto-app.png" alt="Crypto.com App" className="w-10 h-10 mr-4" />
              <div>
                <h3 className="font-medium">Crypto.com App</h3>
                <p className="text-sm text-gray-500">Instant payment with no network cost</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#E0F7EF] text-[#08B882] rounded-full text-sm">Active</span>
          </div>

          {/* MetaMask & Others */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <img src="/assets/icons/metamask.png" alt="MetaMask" className="w-10 h-10 mr-4" />
              <div>
                <h3 className="font-medium">MetaMask, WalletConnect, and Other Cryptocurrency Wallets</h3>
              </div>
            </div>
            <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
              Activate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 