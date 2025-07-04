
const DocumentsUpload = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Documents Upload</h2>
        <p className="text-gray-600 mt-1">
          Please Upload The Following Documents.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Based on your provided information, please prepare the following
          documents for upload:
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Business Registration or Equivalent</h3>
              <p className="text-gray-500 text-sm">Status</p>
            </div>
            <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
              Upload
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Company's Proof of Address</h3>
              <p className="text-gray-500 text-sm">Status</p>
            </div>
            <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Support Information</h3>
        <textarea
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] h-32"
          placeholder="If you have any difficulty in providing the documents, or any additional information which could be helpful for our review, please describe them in the above box. We will review accordingly."
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-[#08B882] text-white px-8 py-2 rounded-lg">
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default DocumentsUpload; 