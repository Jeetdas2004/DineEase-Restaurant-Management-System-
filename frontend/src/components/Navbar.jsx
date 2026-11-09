import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
  Menu,
  X,
  UtensilsCrossed,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const { navigate, user, cartCount, admin, logout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Book a Table", path: "/book-table" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100/60 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand / Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                Dine<span className="text-orange-500">Ease</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-600">
                Gourmet & Dining
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/70"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Quick link to Admin Portal */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-orange-100 hover:text-orange-700 transition"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
              <span>Admin</span>
              {admin && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </Link>
          </div>

          {/* Right Action Icons: Cart & Profile / Login */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2.5 rounded-full bg-orange-50 hover:bg-orange-100/80 text-orange-600 transition duration-200 cursor-pointer"
              aria-label="View shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile or Login */}
            <div className="hidden sm:block">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <button className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full border border-gray-200 hover:border-orange-200 hover:bg-orange-50/40 transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 max-w-[100px] truncate">
                      {user.name || "My Account"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-1 w-56 bg-white rounded-2xl shadow-xl py-2 border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-600 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user.email || user.name}
                        </p>
                      </div>

                      <Link
                        to="/my-bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <Calendar className="w-4 h-4 mr-3 text-orange-500" />
                        My Table Bookings
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <Package className="w-4 h-4 mr-3 text-orange-500" />
                        My Orders
                      </Link>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-3 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-700 hover:text-orange-600 px-3 py-2 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-full hover:shadow-md hover:shadow-orange-500/25 transition cursor-pointer"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-base transition ${
                    isActive(link.path)
                      ? "bg-orange-500 text-white font-semibold"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 font-medium"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                  Admin Portal
                </span>
                {admin && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                    Logged In
                  </span>
                )}
              </Link>

              <div className="border-t border-gray-100 pt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-1">
                      <p className="text-xs text-gray-600 font-medium">Logged in as</p>
                      <p className="text-sm font-bold text-gray-800">{user.name || user.email}</p>
                    </div>
                    <Link
                      to="/my-bookings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600"
                    >
                      <Calendar className="w-4 h-4 mr-3 text-orange-500" />
                      My Table Bookings
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-600"
                    >
                      <Package className="w-4 h-4 mr-3 text-orange-500" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-red-600 text-left font-medium"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 px-4 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 text-center py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 text-center py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-md shadow-orange-500/25"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
