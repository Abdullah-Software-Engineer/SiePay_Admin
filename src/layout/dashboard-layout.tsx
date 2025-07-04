import { Outlet } from "react-router-dom";
// import { useState } from "react";
import { Menu } from "lucide-react";
import SideBar from "./SideBar/SideBar";
import { useGetUser } from "../api/queries";
import useAuth from "../hook/useAuth";

const DashboardLayout = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: user, isLoading } = useGetUser();
  const { clearAuth } = useAuth();

  // Check if user is not approved
  const isUserNotApproved = Boolean(user && (user.status === undefined || user.status === false));

  return (
    <div className="main-layout  ">
      {/* Sidebar */}
      <div
        className="sidebar-left sidebar-container"
        // className={` fixed left-0 top-0 z-40 h-screen duration-300 ease-linear px-2 py-4 w-64 text-white flex-shrink-0 transform ${
        //   sidebarOpen ? "translate-x-0 bg-[#001939] " : "-translate-x-full"
        // } lg:translate-x-0`}
      >
        <SideBar
          isDisabled={isUserNotApproved}
        // onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Mobile header with hamburger */}
        <header className="lg:hidden bg-[#001939] p-4 flex items-center justify-between">
          <button
            // onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <img src="/assets/icons/icon_1.svg" alt="Logo" className="h-8" />
            <span className="text-white ml-2 font-semibold">Dappomatics</span>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1">
          <div className="bg-white w-[99%] 2xl:max-w-fit rounded-2xl overflow-hidden p-4 ">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div>Loading...</div>
              </div>
            ) : isUserNotApproved ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                      <svg
                        className="h-6 w-6 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Account Pending Approval
                  </h3>
                  <p className="mb-4 text-sm text-gray-500">
                    Your account hasn't been approved by an admin yet. Please wait for approval or contact support.
                  </p>
                  <button
                    onClick={clearAuth}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
