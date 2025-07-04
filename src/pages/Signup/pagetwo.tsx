import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "../../lib/utils";

const SignUpPage = () => {
  const [userType, setUserType] = useState<"merchant" | "admin">("merchant");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section */}

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        {/* Logo */}
        <div className="mb-12 self-start">
          <img src="/assets/logo.png" alt="Logo" className="h-12" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl text-center text-gray-900 mb-2">
              Create an account
            </h1>
            <p className="text-[#737373] font-medium text-center">
              Signup and get 15 days free trail
            </p>
          </div>

          {/* User Type Toggle */}

          <div className="flex gap-4 rounded-md overflow-hidden ">
            <button
              type="button"
              onClick={() => setUserType("merchant")}
              className={cn(
                "flex-1 py-2 text-center text-sm font-medium rounded-3xl transition-colors hover:cursor-pointer",
                userType === "merchant"
                  ? "bg-[#001939] text-white"
                  : "text-[#1E1E1E] border"
              )}
            >
              Merchant
            </button>
            <button
              type="button"
              onClick={() => setUserType("admin")}
              className={cn(
                "flex-1 py-2 text-center text-sm font-medium rounded-3xl transition-colors hover:cursor-pointer",
                userType === "admin"
                  ? "bg-[#001939] text-white"
                  : "text-[#1E1E1E] border"
              )}
            >
              Admins
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#737373] mb-2 px-6">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-6 py-3  bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-[#737373] mb-2 px-6">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-3  bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2 px-6">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3  bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#08B882] text-white py-3 rounded-3xl hover:cursor-pointer font-medium hover:bg-[#07a474] transition-colors"
            >
              Submit
            </button>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-3 border border-[#737373] rounded-3xl hover:bg-gray-50 transition-colors">
                <img
                  src="/assets/icons/apple.png"
                  alt="Apple"
                  className="w-5 h-5"
                />
                <span>Apple</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 border border-[#737373] rounded-3xl hover:bg-gray-50 transition-colors">
                <img
                  src="/assets/icons/google.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Google</span>
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-600">
            Already Have An Account?{" "}
            <Link to="/login" className="text-[#08B882] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex flex-1 bg-[#F4FBF7] p-8 items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <img 
          src="/assets/signin_background.png" 
          alt="Background Pattern" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Close Button */}
        <button className="absolute top-3 right-10 w-9 h-9 rounded-full border-[#08B882] border-2 bg-white z-10">
          <X size={20} className="text-[#08B882] m-auto" />
        </button>

        {/* Main Content Container */}
        <div className="relative w-full max-w-lg z-10">
          {/* Feature Card */}
          <div className=" p-6 mb-12">
            <img
              src="/assets/invoice-generation.png"
              alt="Invoice Generation"
              className="w-full h-auto rounded-[20px]"
            />
          </div>

          {/* Trust Indicators */}
          <div className="space-y-8">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-gray-600 text-sm">Trusted by</span>
                <span className="text-5xl font-semibold">3.20</span>
                <span className="text-[#08B882] font-medium text-xl">K+</span>
              </div>
              <p className="text-gray-600 mt-1">Happy customers</p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl font-semibold">5.0</span>
                <div className="flex text-yellow-400">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
              </div>
              <div className="flex -space-x-3">
                <img
                  src="/assets/avatars/1.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <img
                  src="/assets/avatars/2.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <img
                  src="/assets/avatars/3.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <img
                  src="/assets/avatars/4.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <div className="w-10 h-10 rounded-full bg-[#08B882] flex items-center justify-center border-2 border-[#1E293B]">
                  <span className="text-white">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
