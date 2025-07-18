export type User = {
  totalTokens: any;
  _id: string;
  email: string;
  username: string;
  status?: boolean;
  role?: string; // 'admin' | 'merchant'
  flow?: "master" | "forwarder";
  createdAt?: string;
  name?: string;
};

export type SignupFormBaseValues = {
  email: string;
  name: string;
  role?: string;
  password: string;
  merchant?: string;
};

export type LoginFormBaseValues = {
  email: string;
  password: string;
};

export type ProductType = {
  _id: string;
  name: string;
  desc: string;
  callback_url: string;
};

export type InvoiceType = {
  _id: string;
  merchant: string;
  address: string;
  category: "fixed" | "flexible";
  endAt?: string;
  startedAt: string;
  store: string;
  label: string;
  detail: string;
  status: boolean;
  amount?: number;
  payments: PaymentType[];
};

////////////

export type AuthResponse = {
  success: boolean;
  data: User;
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type StoreAddValuesType = {
  name: string;
  desc: string;
  callback_url: string;
};

export type StoreType = {
  _id: string;
  name: string;
  desc: string;
  callback_url: string;
};

export type AddressType = {
  address: string;
  status: "1" | "2";
  merchant: string;
  category: "1" | "2";
  _id: string;
};

export type TokenType = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chainId: string;
  _id: string;
};

export type PaymentType = {
  _id: string;
  invoice: string;
  tx: string;
  to: string;
  from: string;
  amount: string;
  txHash: string;
};

export type WithdrawHistoryType = {
  _id: string;
  txHash: string;
  amount: number;
  token: string;
};

export type TransactionType = {
  _id: string;
  address: string;
  merchant: string;
  txObject: string;
  txHash: string;
  status: boolean;
};

// Merchant management types for admin - extending User since merchants are users
export type MerchantType = User & {
  stores?: StoreType[];
  totalTokens?: number;
  totalStores?: number;
  totalAddresses?: number;
  totalOpenInvoices?: number;
};

export type MerchantUpdateType = {
  status?: boolean;
  flow?: "master" | "forward";
  tokenCount?: number;
};
