import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Layers,
  ShoppingCart,
  CalendarDays,
  LogOut,
  X,
  Menu as MenuIcon,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const { setAdmin, axios, admin } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/orders",
      name: "Customer Orders",
      icon: ShoppingCart,
    },
    {
      path: "/admin/bookings",
      name: "Table Reservations",
      icon: CalendarDays,
    },
    {
      path: "/admin/categories",
      name: "All Categories",
      icon: Layers,
    },
    {
      path: "/admin/add-category",
      name: "Add Category",
      icon: PlusCircle,
    },
    {
      path: "/admin/menus",
      name: "All Menus",
      icon: Package,
    },
    {
      path: "/admin/add-menu",
      name: "Add Menu Item",
      icon: PlusCircle,
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (e) {
      // ignore
    } finally {
      setAdmin(null);
      toast.success("Admin signed out");
      navigate("/admin");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-2xl bg-white shadow-md border border-gray-200 text-gray-700 cursor-pointer"
          aria-label="Toggle admin sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30 backdrop-blur-xs"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  Dine<span className="text-orange-400">Ease</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-orange-400 font-bold">
                  Management
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          {/* Back to store */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition"
          >
            <Store className="w-4 h-4 text-orange-400" />
            <span>View Public Website</span>
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200/80 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="pl-12 lg:pl-0">
            <h2 className="text-xl font-bold text-gray-900">
              Restaurant Control Center
            </h2>
            <p className="text-xs text-gray-400">
              Logged in as {admin?.email || "admin@dineease.com"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-full transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Customer Storefront</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50/70">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
