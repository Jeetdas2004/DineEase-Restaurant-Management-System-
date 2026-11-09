import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookTable from "./pages/BookTable";
import MyBookings from "./pages/MyBookings";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import AdminLayout from "./pages/admin/AdminLayout";
import { AppContext } from "./context/AppContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AddCategory from "./pages/admin/AddCategory";
import AddMenu from "./pages/admin/AddMenu";
import Categories from "./pages/admin/Categories";
import Menus from "./pages/admin/Menus";
import Orders from "./pages/admin/Orders";
import Bookings from "./pages/admin/Bookings";
import Dashboard from "./pages/admin/Dashboard";

// Helper component to auto-scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const location = useLocation();
  const adminPath = location.pathname.startsWith("/admin");
  const { admin } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "16px",
            background: "#18181b",
            color: "#fff",
            fontSize: "14px",
            padding: "12px 18px",
          },
          success: {
            iconTheme: {
              primary: "#f97316",
              secondary: "#fff",
            },
          },
        }}
      />

      {!adminPath && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu-details/:id" element={<MenuDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/book-table" element={<BookTable />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={admin ? <AdminLayout /> : <AdminLogin />}>
            <Route index element={admin ? <Dashboard /> : <AdminLogin />} />
            <Route
              path="add-category"
              element={admin ? <AddCategory /> : <AdminLogin />}
            />
            <Route
              path="add-menu"
              element={admin ? <AddMenu /> : <AdminLogin />}
            />
            <Route
              path="categories"
              element={admin ? <Categories /> : <AdminLogin />}
            />
            <Route path="menus" element={admin ? <Menus /> : <AdminLogin />} />
            <Route path="orders" element={admin ? <Orders /> : <AdminLogin />} />
            <Route
              path="bookings"
              element={admin ? <Bookings /> : <AdminLogin />}
            />
          </Route>
        </Routes>
      </div>

      {!adminPath && <Footer />}
    </div>
  );
};

export default App;
