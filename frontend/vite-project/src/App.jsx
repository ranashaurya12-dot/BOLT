import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Orders from "./pages/Orders"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminUsers from "./pages/admin/AdminUsers"
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import About from "./components/about"
// ✅ Protected Route
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  if (loading) return <h1 className="text-4xl p-20">Loading...</h1>
  if (!user) return <Navigate to="/login" />
  return children
}

// ✅ Admin Route
function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  if (loading) return <h1 className="text-4xl p-20">Loading...</h1>
  if (!user) return <Navigate to="/login" />
  if (!user.isAdmin) return <Navigate to="/" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute><Orders /></ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute><AdminProducts /></AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute><AdminOrders /></AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute><AdminUsers /></AdminRoute>
        } />
        <Route
  path="/admin/edit-product/:id"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>
        <Route
  path="/admin/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  )
}

export default App