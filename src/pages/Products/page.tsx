import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Link,
} from "lucide-react";

import { CreateStoreModal } from "../../components/CreateStoreModal";
import { useGetMyStores } from "../../api/queries/useGetMyStores";
import type { ProductType } from "../../types";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  price: string;
  name: string;
  billing: string;
  created: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    price: "$ 10",
    name: "FGG",
    billing: "Monthly",
    created: "Feb 06 2025, 01:16am",
  },
  {
    id: "2",
    price: "$ 10",
    name: "Coding Dapps",
    billing: "Monthly",
    created: "Feb 06 2025, 01:16am",
  },
  {
    id: "3",
    price: "$ 10",
    name: "Coding Dapps",
    billing: "Monthly",
    created: "Feb 06 2025, 01:16am",
  },
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["All", "Active", "Pending", "Cancelled"];

  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);

  const { data, isPending } = useGetMyStores();

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#001939] text-white rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Products</h2>
            <span className="text-[#08B882] text-lg">(Integration Guide)</span>
            <Link size={20} className="text-[#08B882]" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#08B882] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#07a374] transition-colors"
          >
            + Create Product
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border-4 border-[#001939] overflow-hidden">
        {/* Filter Tabs */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#08B882] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search/Filter Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
              <Filter size={18} />
              <span>Filter</span>
              <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">
                0
              </span>
            </button>
            <div className="flex-1">
              <div className="relative">
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08B882]"
                  placeholder="Payment ID, Description"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isPending ? <div>Loading...</div> : <Table products={data || []} />}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Showing Results</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm text-gray-700">Previous</span>

            <div className="flex gap-1">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm ${
                    currentPage === page
                      ? "bg-[#08B882] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2 text-gray-400">...</span>
              <button className="w-8 h-8 rounded text-sm text-gray-700 hover:bg-gray-100">
                32
              </button>
            </div>

            <span className="text-sm text-gray-700">Next</span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Store Modal */}
      <CreateStoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const Table = ({ products }: { products: ProductType[] }) => {
  const navigate = useNavigate();

  const handleViewProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboard/products/${productId}`);
  };


  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Callback URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  handleViewProduct(product._id, {} as React.MouseEvent)
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {product.desc || "No description"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                  {product.callback_url || "Not set"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleViewProduct(product._id, e)}
                      className="bg-[#08B882] text-white px-3 py-1 rounded-md text-xs font-medium hover:bg-[#07a374] transition-colors"
                    >
                      View Details
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No products found. Create your first product to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Products;
