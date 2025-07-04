import { createBrowserRouter, Navigate } from "react-router-dom";
import SignUpPage from "../pages/Signup/page";
import LoginPage from "../pages/Login/pageTwo";
import DashboardLayout from "../layout/dashboard-layout";
import { RouteConstants } from "../constants/routes";
import GetStartedPage from "../pages/Home/page";
import UserProfileOverview from "../pages/UserProfile/UserProfileOverview";
import UserProfileDetails from "../pages/UserProfile/UserProfileDetails";
import Overview from "../pages/Overview/page";
import Payment from '../pages/Payments/page';
import Settings from '../pages/Settings/page';
import BusinessSettings from '../pages/Settings/Business/page';
import Members from '../pages/Settings/Members/page';
import PaymentSettings from '../pages/Settings/Payment/page';
import Payout from '../pages/Settings/Payout/page';
import BalancePage from "../pages/Balances/page";
import SubscriptionsPage from "../pages/Subscriptions/page";
import CustomersPage from "../pages/Customers/page";
import ProductsPage from "../pages/Products/page";
import InvoicePage from "../pages/Invoices/page";
import ProductDetailsPage from "../pages/Invoices/ProductDetails";
import ProtectedRoute from "../components/ProtectedRoute";
import Token from "../pages/Token/page";
import TokenDetail from "../pages/Token/TokenDetail";
import Address from "../pages/Address/page";
import AddressDetail from "../pages/Address/AddressDetail";
import ProductDetails from "../pages/Products/ProductDetails";
import ProductInvoiceDetails from "../pages/Products/ProductInvoiceDetails";
// Admin pages
import MerchantList from "../pages/Admin/MerchantList";
import MerchantDetail from "../pages/Admin/MerchantDetail";
import TokenUpdate from "../pages/Admin/TokenUpdate";

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
        path: "payments",
        element: <Payment />,
      },
      {
        path: "balances",
        element: <BalancePage />,
      },
      {
        path: "invoices",
        element: <InvoicePage />
      },
      {
        path: "invoices/:id",
        element: <ProductDetailsPage />
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionsPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "product/invoice/:invoiceId",
        element: <ProductInvoiceDetails />,
      },
      {
        path: "address",
        element: <Address />,
      },
      {
        path: "address/:addressId",
        element: <AddressDetail />,
      },
      {
        path: "token",
        element: <Token />,
      },
      {
        path: "token/:tokenId",
        element: <TokenDetail />,
      },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            index: true,
            element: <Navigate to="business" replace />,
          },
          {
            path: "business",
            element: <BusinessSettings />,
          },
          {
            path: "members",
            element: <Members />,
          },
          {
            path: "payment",
            element: <PaymentSettings />,
          },
          {
            path: "payout",
            element: <Payout />,
          },
        ],
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
        path: "admin/token-update",
        element: <TokenUpdate />,
      },
    ],
  },
]);

export default router;
