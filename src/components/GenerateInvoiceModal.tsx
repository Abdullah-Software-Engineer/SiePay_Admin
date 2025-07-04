import React, { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import { useGenerateInvoice } from "../api/mutations/useGenerateInvoice";
import type { InvoiceCreateArgs } from "../validation";

interface GenerateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

interface InvoiceFormData {
  label: string;
  detail: string;
  date: string;
  time: string;
  category: "flexible" | "fixed";
  amount: string;
}

const GenerateInvoiceModal: React.FC<GenerateInvoiceModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const mutation = useGenerateInvoice(productId);

  // Get current date and time + 10 minutes as default
  const getDefaultDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].slice(0, 5);
    return { date, time };
  };

  const defaultDateTime = getDefaultDateTime();

  const [formData, setFormData] = useState<InvoiceFormData>({
    label: "",
    detail: "",
    date: defaultDateTime.date,
    time: defaultDateTime.time,
    category: "flexible",
    amount: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [dateTimeError, setDateTimeError] = useState("");

  const validateDateTime = (date: string, time: string) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const minDateTime = new Date();
    minDateTime.setMinutes(minDateTime.getMinutes() + 10);

    if (selectedDateTime < minDateTime) {
      setDateTimeError(
        "Date and time must be at least 10 minutes in the future"
      );
      return false;
    }

    setDateTimeError("");
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Validate datetime when date or time changes
      if (name === "date" || name === "time") {
        validateDateTime(
          name === "date" ? value : prev.date,
          name === "time" ? value : prev.time
        );
      }

      return newData;
    });
  };

  const setToday = () => {
    const defaultDateTime = getDefaultDateTime();
    setFormData((prev) => ({
      ...prev,
      date: defaultDateTime.date,
      time: defaultDateTime.time,
    }));
    setDateTimeError("");
  };

  const clearDateTime = () => {
    setFormData((prev) => ({
      ...prev,
      date: "",
      time: "",
    }));
    setDateTimeError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate datetime before submission
    if (!validateDateTime(formData.date, formData.time)) {
      return;
    }

    setIsLoading(true);

    try {
      // Combine date and time for submission
      const combinedDateTime = new Date(`${formData.date}T${formData.time}`);

      // Convert form data to InvoiceCreateArgs
      const invoiceData: InvoiceCreateArgs = {
        label: formData.label,
        detail: formData.detail,
        category: formData.category,
        endAt: combinedDateTime,
        amount: formData.amount ? parseFloat(formData.amount) : undefined,
      };

      // Use the mutation to create the invoice
      mutation.mutate(invoiceData);

      console.log("Creating invoice:", {
        ...invoiceData,
        productId,
      });

      // Reset form and close modal
      const defaultDateTime = getDefaultDateTime();
      setFormData({
        label: "",
        detail: "",
        date: defaultDateTime.date,
        time: defaultDateTime.time,
        category: "flexible",
        amount: "",
      });
      setDateTimeError("");
      onClose();
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Generate Invoice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Label Field */}
          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Label
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
              placeholder="Enter invoice label"
            />
          </div>

          {/* Detail Field */}
          <div>
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Detail
            </label>
            <textarea
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent resize-none"
              placeholder="Enter invoice details"
            />
          </div>

          {/* Date and Time Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date and Time
            </label>

            {/* Date and Time Inputs */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Clock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={clearDateTime}
                className="px-3 py-1 text-sm text-[#08B882] hover:bg-[#08B882] hover:text-white rounded transition-colors border border-[#08B882]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={setToday}
                className="px-3 py-1 text-sm text-[#08B882] hover:bg-[#08B882] hover:text-white rounded transition-colors border border-[#08B882]"
              >
                Now + 10 min
              </button>
            </div>

            {/* Error Message */}
            {dateTimeError && (
              <p className="text-sm text-red-600 mt-1">{dateTimeError}</p>
            )}

            {/* Helper Text */}
            <p className="text-xs text-gray-500 mt-1">
              Selected time must be at least 10 minutes in the future
            </p>
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
            >
              <option value="flexible">Flexible</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount{" "}
              {formData.category === "fixed" && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required={formData.category === "fixed"}
                min="0"
                step="0.01"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            {formData.category === "flexible" && (
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for flexible pricing
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !!dateTimeError}
              className="flex-1 px-4 py-2 bg-[#08B882] text-white rounded-lg hover:bg-[#07a374] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Generate Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceModal;
