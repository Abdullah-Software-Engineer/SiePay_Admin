import { Eye, EyeOff, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
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
    <div className="min-h-screen flex p-4 ">
      <div className="flex flex-1 flex-col items-center justify-center px-6  lg:px-12">
        {/* Logo */}
        <div className="mb-12 self-start">
          <img src="/assets/logo.png" alt="Logo" className="h-12" />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl text-center text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-[#737373] font-medium text-center">
              Please enter your details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              login
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
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#08B882] font-medium">
              Signup
            </Link>
          </p>
        </div>
      </div>

      <div className=" flex-1">
        <div className="relative h-full rounded-3xl overflow-hidden w-full">
          <img
            src="/assets/signin_background.png"
            alt="Development Agency"
            className="h-full w-full  rounded-lg"
            style={{
              float: "right",
              shapeOutside: "url('/images/whycode-imageone.svg')",
            }}
          />
          <div className="absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-b from-transparent to-black opacity-90 rounded-lg"></div>
          <button className="absolute top-1 right-4 w-9 h-9 rounded-full border-[#08B882] border-2 bg-white z-10">
            <X size={20} className="text-[#08B882] m-auto" />
          </button>
          <div className="absolute flex justify-center items-center h-full p-6 mb-12">
            <img
              src="/assets/login.png"
              alt="Invoice Generation"
              className="w-[60%] h-auto rounded-[20px]"
            />
            <img
              src="/assets/metamask.png"
              className="absolute top-76 w-44 h-44 right-[38%]"
            />
          </div>
          <div className="absolute bottom-10 left-10">
            <span className="text-white text-sm">Trusted by</span>
            <div className="flex gap-2 ">
              <span className=" text-white text-5xl font-bold">3.20</span>
              <span className="text-[#08B882]  font-bold text-xl">K+</span>
            </div>
            <p className="text-white mt-1">Happy customers</p>
          </div>
          <div className="absolute bottom-10 right-10">
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(228, 228, 228, 0.10) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.20)",
              }}
              className="backdrop-blur-2xl rounded-2xl text-white px-4 py-2"
            >
              <div className="flex justify-between items-center gap-2 mb-3">
                <span className="text-3xl font-semibold">5.0</span>
                <div className="flex text-yellow-400">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
              </div>
              <div className="flex -space-x-3">
                <img
                  src="/assets/avatars/1.png"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <img
                  src="/assets/avatars/2.png"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <img
                  src="/assets/avatars/3.png"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#1E293B]"
                />
                <img
                  src="/assets/avatars/4.png"
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

export default LoginPage;
