import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-8">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-4">
          <Link
            to="/admin"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            📦 Products
          </Link>

          <Link
            to="/admin/orders"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            🛒 Orders
          </Link>

          <Link
            to="/admin/users"
            className="hover:bg-gray-800 p-3 rounded-lg"
          >
            👥 Users
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;