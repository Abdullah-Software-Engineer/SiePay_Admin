import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../../validation";
import { MerchantRegisterInitialValues } from "../../constants/constant";
import { useRegister } from "../../api";

const SignUpPage = () => {
  const [userType, setUserType] = useState<"merchant" | "admin">("merchant");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      // Map form values to API expected format
      const apiData = {
        email: values.email,
        name: values.name,
        password: values.password,
      };

      await registerMutation.mutateAsync(apiData);

      // Redirect to dashboard on successful registration
      navigate("/dashboard");
    } catch (error) {
      // Error is handled by the mutation hook via toast
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex p-4 bg-white">
      {/* Logo */}
      <div className="mb-12 self-start">
        <img src="/assets/logo.png" alt="Logo" className="h-12" />
      </div>

      <div className="mt-12 flex flex-1 flex-col items-center justify-center px-6  lg:px-12">
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
          <Formik
            initialValues={MerchantRegisterInitialValues}
            validationSchema={RegisterSchema()}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
            }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-[#737373] mb-2 px-6">
                    Full name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-6 py-3 bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]",
                      errors.name && touched.name ? "border border-red-500" : ""
                    )}
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1 px-6"
                  />
                </div>

                <div>
                  <label className="block text-[#737373] mb-2 px-6">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-6 py-3 bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]",
                      errors.email && touched.email
                        ? "border border-red-500"
                        : ""
                    )}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1 px-6"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2 px-6">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full px-6 py-3 bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]",
                        errors.password && touched.password
                          ? "border border-red-500"
                          : ""
                      )}
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1 px-6"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-2 px-6">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full px-6 py-3 bg-[#F4F8F9] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#08B882]",
                        errors.confirmPassword && touched.confirmPassword
                          ? "border border-red-500"
                          : ""
                      )}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1 px-6"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || registerMutation.isPending}
                  className={cn(
                    "w-full py-3 rounded-3xl font-medium transition-colors",
                    isSubmitting || registerMutation.isPending
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-[#08B882] text-white hover:cursor-pointer hover:bg-[#07a474]"
                  )}
                >
                  {isSubmitting || registerMutation.isPending
                    ? "Creating Account..."
                    : "Submit"}
                </button>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 p-3 border border-[#737373] rounded-3xl hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="/assets/icons/apple.png"
                      alt="Apple"
                      className="w-5 h-5"
                    />
                    <span>Apple</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 p-3 border border-[#737373] rounded-3xl hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="/assets/icons/google.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span>Google</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-600">
            Already Have An Account?{" "}
            <Link to="/" className="text-[#08B882] font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex lg:flex-1 relative items-center justify-center">
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
              src="/assets/invoice-generation.png"
              alt="Invoice Generation"
              className="w-[60%] h-auto rounded-[20px]"
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
          <div className="absolute bottom-20 right-10">
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

export default SignUpPage;
