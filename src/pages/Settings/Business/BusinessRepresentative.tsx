
const BusinessRepresentative = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Business Representative</h2>
        <p className="text-gray-600 mt-1">
          Please Provide Us The Information Of The Business Owner.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Auto-complete from User Profile</label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Select profile</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Legal Name of Person</label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="First Name"
            />
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Nationality</label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Select nationality</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">ID Document Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter ID document number"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Tax ID (TIN / EIN, if any)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter tax ID"
          />
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

        <div className="flex justify-end">
          <button type="submit" className="bg-[#08B882] text-white px-8 py-2 rounded-lg">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessRepresentative; 