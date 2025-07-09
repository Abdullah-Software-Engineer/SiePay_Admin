import { createBrowserRouter, Navigate } from "react-router-dom";
import SignUpPage from "../pages/Signup/page";
import LoginPage from "../pages/Login/pageTwo";
import DashboardLayout from "../layout/dashboard-layout";
import { RouteConstants } from "../constants/routes";
import GetStartedPage from "../pages/Home/page";
import UserProfileOverview from "../pages/UserProfile/UserProfileOverview";
import UserProfileDetails from "../pages/UserProfile/UserProfileDetails";
import Overview from "../pages/Overview/page";
import ProtectedRoute from "../components/ProtectedRoute";
// Admin pages
import MerchantList from "../pages/Admin/MerchantList";
import MerchantDetail from "../pages/Admin/MerchantDetail";
import TokenUpdate from "../pages/Admin/TokenUpdate";
import TokenList from "../pages/Admin/TokenList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
  
  {
    path: RouteConstants.DASHBOARD,
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        index: true, // when /dashboard is visited
        element: <Navigate to="getstarted" replace />,
      },
      {
        path: "getstarted",
        element: <GetStartedPage />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      
      {
        path: "integration",
        element: <div>Integration Page</div>,
      },
      {
        path: "fee-and-limit",
        element: <div>Fee And Limit Page</div>,
      },
      {
        path: "documentation",
        element: <div>Documentation Page</div>,
      },
      {
        path: "user-profile/",
        element: <UserProfileOverview />,
      },
      {
        path: "user-profile/details",
        element: <UserProfileDetails />,
      },
      // Admin routes
      {
        path: "admin/merchants",
        element: <MerchantList />,
      },
      {
        path: "admin/merchants/:id",
        element: <MerchantDetail />,
      },
      {
        path: "admin/tokens",
        element: <TokenList />,
      },
      {
        path: "admin/token-update",
        element: <TokenUpdate />,
      },
    ],
  },
]);

export default router;
