import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  DollarSign,
  ShoppingCart,
  CalendarCheck,
  Utensils,
  TrendingUp,
  ArrowRight,
  Clock,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { axios, menus, categories } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [orderRes, bookingRes] = await Promise.allSettled([
        axios.get("/api/order/orders"),
        axios.get("/api/booking/bookings"),
      ]);

      if (orderRes.status === "fulfilled" && orderRes.value.data?.success) {
        setOrders(orderRes.value.data.orders || []);
      }
      if (bookingRes.status === "fulfilled" && bookingRes.value.data?.success) {
        setBookings(bookingRes.value.data.bookings || []);
      }
    } catch (e) {
      console.warn("Could not fetch dashboard metrics", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-orange-200">
            Welcome to DineEase Manager
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Restaurant Performance Overview
          </h1>
          <p className="text-orange-100 text-sm mt-1 max-w-xl">
            Monitor real-time kitchen orders, table reservations, and manage your culinary catalog effortlessly.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/add-menu"
            className="inline-flex items-center gap-1.5 bg-white text-orange-600 font-bold px-4 py-2.5 rounded-full text-xs hover:bg-orange-50 shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Dish</span>
          </Link>
          <Link
            to="/admin/add-category"
            className="inline-flex items-center gap-1.5 bg-black/20 text-white font-bold px-4 py-2.5 rounded-full text-xs hover:bg-black/30 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Category</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Revenue
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              ${totalRevenue.toFixed(2)}
            </h3>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Verified Sales</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Orders
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {orders.length}
            </h3>
            <p className="text-xs text-orange-600 font-semibold mt-1">
              {pendingOrders} orders pending
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        {/* Table Bookings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Reservations
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {bookings.length}
            </h3>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              {pendingBookings} awaiting review
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Active Dishes */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Menu Catalog
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {menus.length}
            </h3>
            <p className="text-xs text-purple-600 font-semibold mt-1">
              across {categories.length} categories
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <Utensils className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Orders & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold text-gray-900">Recent Customer Orders</h2>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No orders yet</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <p className="font-bold text-gray-900">
                      {order.user?.name || "Customer"} &bull;{" "}
                      <span className="text-gray-400 font-normal">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      {order.items?.length || 0} item(s) &bull; {order.paymentMethod}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ${Number(order.totalAmount || 0).toFixed(2)}
                    </p>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "Preparing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-gray-900">Recent Table Bookings</h2>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {bookings.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No reservations yet</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking._id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <p className="font-bold text-gray-900">{booking.name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-2">
                      <span>{booking.date} at {booking.time}</span>
                      <span>&bull;</span>
                      <span>{booking.numberOfPeople} Guests</span>
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      booking.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : booking.status === "Cancelled"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
