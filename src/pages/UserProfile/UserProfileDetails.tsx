import { useState } from "react";
import { CheckCircle, Edit, ArrowUpRight } from "lucide-react";

const UserProfileDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [promotionalEmail, setPromotionalEmail] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      promotionalEmail,
    });
    setEditMode(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">User Profile</h2>
            <p className="text-gray-300 mt-1">The following information will not be shown to the public.</p>
          </div>
          <div className="absolute right-4 top-4">
            <ArrowUpRight className="text-[#08B882] transform rotate-45" size={24} />
          </div>
        </div>
      </div>

      {/* Profile Completed Status */}
      <div className="bg-[#e0f7ef] rounded-lg p-4 mb-6 flex items-center">
        <CheckCircle className="text-[#08B882] mr-3" size={24} />
        <span className="text-[#08B882] font-medium">User Profile Completed</span>
      </div>

      {/* Personal Information */}
      <form onSubmit={handleSave} className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <button
            type="button"
            className="bg-[#08B882] text-white rounded-md px-4 py-2 flex items-center"
            onClick={() => setEditMode((v) => !v)}
          >
            <Edit size={16} className="mr-2" />
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-500 text-sm mb-1">First Name</label>
            {editMode ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            ) : (
              <div className="text-gray-800 font-medium">{firstName || "First Name"}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Last Name</label>
            {editMode ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            ) : (
              <div className="text-gray-800 font-medium">{lastName || "Last Name"}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Email</label>
            {editMode ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            ) : (
              <div className="text-gray-800 font-medium">{email || "Email"}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Phone</label>
            {editMode ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            ) : (
              <div className="text-gray-800 font-medium">{phone || "Phone Number"}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Password*</label>
            {editMode ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            ) : (
              <div className="text-gray-800 font-medium">**************</div>
            )}
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">Confirm Password*</label>
            {editMode ? (
              <input
                className="w-full border rounded-md px-3 py-2"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            ) : (
              <div className="text-gray-800 font-medium">**************</div>
            )}
          </div>
        </div>

        {editMode && (
          <div className="mt-6">
            <button type="submit" className="bg-[#08B882] text-white rounded-md px-6 py-2">
              Save
            </button>
          </div>
        )}
      </form>

      {/* Two-factor Authentication */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Two-factor Authentication (Optional)</h3>
          <button className="bg-[#08B882] text-white rounded-md px-4 py-2">
            Add Authentication Step
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          Two-factor Authentication (2FA) is an extra layer of security to your account designed to ensure that you're the only 
          person who can access your account, even if someone knows your password. With 2FA enabled in your account, you 
          will have to provide your 2FA code when performing certain actions on the app.
        </p>

        <div className="bg-gray-50 rounded-md p-3 text-center">
          <span className="text-gray-600">No Two-Factor Authentication Is Enabled Yet</span>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold mb-6">Email Notifications</h3>

        <div className="bg-[#e0f7ef] rounded-md p-4 flex items-center justify-between">
          <div>
            <h4 className="text-gray-800 font-medium">Promotional Email</h4>
            <p className="text-gray-600 text-sm">You'll Receive Promotional Emails Such As Time-Limited Offers, Product Launch And Etc.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={promotionalEmail}
              onChange={() => setPromotionalEmail((v) => !v)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#08B882]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails; 