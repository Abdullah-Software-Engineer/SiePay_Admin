
const Summary = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="text-gray-600 mt-1">
          Please Review The Following Details.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-red-500">Missing required shop information</h3>
          </div>
          <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
            Edit
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-red-500">Missing required business details</h3>
          </div>
          <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
            Edit
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-red-500">Missing required business representative</h3>
          </div>
          <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
            Edit
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-red-500">Missing required business owner</h3>
          </div>
          <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
            Edit
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Documents Upload</h3>
            <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
              Edit
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Business Registration or Equivalent</h4>
              <p className="text-[#08B882]">Not Uploaded</p>
            </div>

            <div>
              <h4 className="font-medium">Company's Proof of Address</h4>
              <p className="text-[#08B882]">Not Uploaded</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            By submitting this form, you agree to Crypto.com Pay{' '}
            <a href="#" className="text-[#08B882]">Terms of Services</a>{' '}
            and you certify that the information is complete and correct.
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Please make sure your provided website link is available for review, and contains the Terms of
          Services and Privacy Policy of your own business.
        </p>

        <div className="flex justify-end">
          <button type="submit" className="bg-[#08B882] text-white px-8 py-2 rounded-lg">
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary; 