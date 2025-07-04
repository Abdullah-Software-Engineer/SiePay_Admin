
const BusinessDetails = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Business Details</h2>
        <p className="text-gray-600 mt-1">
          Tell Us The Details Of Dappomatics.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Role of Business</label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Merchant</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Type of Business</label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Corporation/Company (LLC/LTD/ETC.)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Legal Business Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter legal business name"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Business Registration Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter business registration number"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Tax ID (TIN / EIN, if any)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter tax ID"
          />
          <p className="text-sm text-gray-600 mt-1">Mandatory for merchants in United States or Canada</p>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Business Address</label>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="Address Line 1"
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="Address Line 2"
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="Town/City"
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="State/Country/Region"
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="Country"
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="Postal/Zip Code"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-gray-600">Your operational address is different from business address</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-[#08B882] text-white px-8 py-2 rounded-lg">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessDetails; 