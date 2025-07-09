const RouteConstants = {
  DASHBOARD: "/dashboard",
  GETSTARTED: "getstarted",
  OVERVIEW: "overview",
  PAYMENTS: "payments",
  BALANCES: "balances",
  INVOICES: "invoices",
  CUSTOMERS: "customers",
  SUBSCRIPTIONS: "subscriptions",
  PRODUCTS: "products",
  TOKEN: "token",
  USER_PROFILE: "user-profile",
};

const FullRoutePath = {
  GETSTARTED: "/dashboard/getstarted",
  OVERVIEW: "/dashboard/overview",
  PAYMENTS: "/dashboard/payments",
  BALANCES: "/dashboard/balances",
  INVOICES: "/dashboard/invoices",
  CUSTOMERS: "/dashboard/customers",
  SUBSCRIPTIONS: "/dashboard/subscriptions",
  PRODUCTS: "/dashboard/products",
  TOKEN: "/dashboard/token",
  ADDRESS: "/dashboard/address",
  SETTINGS: "/dashboard/settings",
  INTIGRATION: "/dashboard/integration",
  USER_PROFILE: "/dashboard/user-profile",
  FEE_AND_LIMIT: "/dashboard/fee-and-limit",
  DOCUMENTATION: "/dashboard/documentation",
  // Admin routes
  ADMIN_MERCHANTS: "/dashboard/admin/merchants",
  ADMIN_MERCHANT_DETAIL: "/dashboard/admin/merchants/:id",
  ADMIN_TOKENS: "/dashboard/admin/tokens",
  ADMIN_TOKEN_UPDATE: "/dashboard/admin/token-update",
};


export { RouteConstants };
export default FullRoutePath;


