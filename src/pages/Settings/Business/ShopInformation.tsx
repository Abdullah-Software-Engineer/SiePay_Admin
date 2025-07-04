
const ShopInformation = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Tell Us About Your Shop</h2>
        <p className="text-gray-600 mt-1">
          Before You Can Accept Live Payments With Crypto.Com Pay, We Need To Learn
          More About You And Your Business. We Collect This Information To Comply With
          Requirements From Regulators And Financial Partners And The Terms Of Our
          Service Agreement.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-600 mb-2">Company Brand Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter company brand name"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Shop Website</label>
          <input
            type="url"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter shop website URL"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Terms of Service and Privacy Policy are displayed on your shop website?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="terms" className="mr-2" />
              <span>Yes</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="terms" className="mr-2" />
              <span>No, my company is not selling products and services through the website</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Customer Support Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            placeholder="Enter customer support email"
          />
          <div className="flex items-center mt-2 text-gray-600">
            <span className="text-sm">Why we need your customer support email address?</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Brand assets</h3>
          <p className="text-gray-600 mb-4">
            Your logo and product visuals will be displayed in the payment page and the Pay Catalogue
            of the Crypto.com App when your shop is featured.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">1. Logo</h4>
              <p className="text-sm text-gray-600 mb-4">
                File type: jpeg, png, max size 1 mb,
                dimension at least 100 x 100 pixels
              </p>
              <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
                Upload
              </button>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">2. Product visual</h4>
              <p className="text-sm text-gray-600 mb-4">
                File type: jpeg, png, max size 1 mb,
                dimension at least 500 x 500 pixels
              </p>
              <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
                Upload
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Is your website built by any eCommerce platform?
          </label>
          <div className="flex items-center">
            <input type="radio" name="ecommerce" className="mr-2" />
            <span>Yes</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Anticipated annual transaction volume using Crypto.com Pay
          </label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Select volume</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Anticipated monthly number of customer payments using Crypto.com Pay
          </label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Select number of payments</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            Anticipated monthly number of payout transactions
          </label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Select number of transactions</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">
            In which regions is your product/service available?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Global</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Asia (SG)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>North America (US)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Europe (EU)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Business Industry</label>
          <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]">
            <option>Select industry</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Business Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882]"
            rows={4}
            placeholder="Enter business description"
          />
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

export default ShopInformation; 