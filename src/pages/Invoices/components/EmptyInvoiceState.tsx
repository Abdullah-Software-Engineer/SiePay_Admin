import React from 'react';
import { Plus } from 'lucide-react';

const EmptyInvoiceState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg">
      <div className="mb-4">
        <img
          src="/invoice-icon.svg"
          alt="Create Invoice"
          className="w-16 h-16"
          style={{ filter: 'hue-rotate(85deg)' }}  // Makes the icon greenish
        />
      </div>
      <h3 className="text-lg font-medium mb-2">Create An Invoice To Collect Payments</h3>
      <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
        <Plus className="w-4 h-4" /> New Invoice
      </button>
    </div>
  );
};

export default EmptyInvoiceState; 