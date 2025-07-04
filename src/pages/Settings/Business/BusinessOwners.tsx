
const BusinessOwners = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Business Owners</h2>
        <p className="text-gray-600 mt-1">
          Due To Regulatory Guidelines, We Are Required To Collect Information On Anyone
          Who Has Significant Ownership Or Control Over The Business.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          Based on your provided information, please prepare the following
          documents for upload:
        </p>
        <ul className="list-inside list-disc mt-2 space-y-1 text-gray-600">
          <li>Business Registration or Equivalent</li>
          <li>Company's Proof of Address</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Add any individual who owns or controls 25% or more of business
        </h3>
        <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center">
          <img src="/no-data.svg" alt="No Data" className="w-24 h-24 mb-2" />
          <p className="text-gray-600">No Data</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2">+</span>
          Add A Business Owner
        </button>
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input type="radio" name="parent_company" />
          <span className="text-gray-600">
            One or more owners above are holding the shares through parent company
          </span>
        </label>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-[#08B882] text-white px-8 py-2 rounded-lg">
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default BusinessOwners; 