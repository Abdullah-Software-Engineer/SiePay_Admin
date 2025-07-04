import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateStore } from '../api/mutations/useCreateStore';
import type { StoreAddValuesType } from '../types';

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoreModal = ({ isOpen, onClose }: CreateStoreModalProps) => {
  const { mutate: createStore, isPending } = useCreateStore();
  const [formData, setFormData] = useState<StoreAddValuesType>({
    name: '',
    desc: '',
    callback_url: ''
  });
  const [errors, setErrors] = useState<Partial<StoreAddValuesType>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof StoreAddValuesType]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StoreAddValuesType> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Store name is required';
    }

    if (!formData.desc.trim()) {
      newErrors.desc = 'Description is required';
    }

    if (!formData.callback_url.trim()) {
      newErrors.callback_url = 'Callback URL is required';
    } else {
      try {
        new URL(formData.callback_url);
      } catch {
        newErrors.callback_url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    createStore(formData, {
      onSuccess: () => {
        handleClose();
      }
    });
  };

  const handleClose = () => {
    setFormData({ name: '', desc: '', callback_url: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Create Store</h3>
          <button
            onClick={handleClose}
            disabled={isPending}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Store Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter store name"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="Enter store description"
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent resize-none ${
                errors.desc ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isPending}
            />
            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
            )}
          </div>

          {/* Callback URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Callback URL *
            </label>
            <input
              type="url"
              name="callback_url"
              value={formData.callback_url}
              onChange={handleInputChange}
              placeholder="https://example.com/callback"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08B882] focus:border-transparent ${
                errors.callback_url ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isPending}
            />
            {errors.callback_url && (
              <p className="text-red-500 text-sm mt-1">{errors.callback_url}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              This URL will receive payment notifications
            </p>
          </div>

          {/* Modal Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-[#08B882] text-white py-3 rounded-lg font-medium hover:bg-[#07a374] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Creating...' : 'Create Store'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 