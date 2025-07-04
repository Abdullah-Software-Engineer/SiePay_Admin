import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const UserProfileOverview = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Get Started</h2>
            <p className="text-gray-300 mt-1">Only a few steps to start receive your first crypto payment.</p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Basic Information</h3>
          <Link to="/dashboard/user-profile/details" className="bg-[#08B882] text-white rounded-md px-4 py-2 flex items-center">
            Go To User Profile
          </Link>
        </div>

        <div className="flex items-center">
          <CheckCircle className="text-[#08B882] mr-3" size={24} />
          <span className="text-gray-800 font-medium">User Profile</span>
        </div>
        <p className="text-gray-600 text-sm">Tell us about your user profile.</p>
      </div>

      {/* Verify Your Business */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Verify Your Business</h3>
          <button className="bg-[#08B882] text-white rounded-md px-4 py-2">
            Go To Verification
          </button>
        </div>

        <div className="flex items-center">
          <CheckCircle className="text-[#08B882] mr-3" size={24} />
          <span className="text-gray-800 font-medium">0% Completed</span>
        </div>
        <p className="text-gray-600 text-sm">Tell us about you</p>

        <ul className="mt-4 space-y-2">
          <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span>Shop Information</span>
            <span className="text-gray-500 text-sm">Tell us more about your shop information.</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span>Business Details</span>
            <span className="text-gray-500 text-sm">Type of business and business address.</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span>Business Representative</span>
            <span className="text-gray-500 text-sm">Basic info of your business representative.</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span>Business Owner</span>
            <span className="text-gray-500 text-sm">Basic info of your business owner.</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span>Documents Uploads</span>
            <span className="text-gray-500 text-sm">Upload docs to verify your business.</span>
          </li>
          <li className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span>Summary</span>
            <span className="text-gray-500 text-sm">Business Information Summary.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileOverview; 