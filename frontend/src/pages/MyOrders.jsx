import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Package, Clock, MapPin, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.warn("Could not fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Preparing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/20 via-white to-gray-50/50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              My <span className="text-orange-500">Orders</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track your delicious food deliveries and view order history
            </p>
          </div>
          <Link
            to="/menu"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-orange-500/20 transition"
          >
            <span>Order Food</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500 text-sm">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Placed Yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven't ordered any meals yet. Explore our handcrafted menu to treat yourself today!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md"
            >
              <span>Browse Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Order ID: #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="py-5 divide-y divide-gray-100">
                  {order.items?.map((item, idx) => {
                    const menuItem = item.menuItem;
                    return (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {menuItem?.image ? (
                            <img
                              src={menuItem.image}
                              alt={menuItem?.name || "Dish"}
                              className="w-14 h-14 rounded-2xl object-cover bg-gray-100"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">
                              {menuItem?.name || "Gourmet Dish"}
                            </h4>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity} &times; ${Number(menuItem?.price || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-sm text-gray-900">
                          ${((menuItem?.price || 0) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Details */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600 bg-gray-50/60 p-4 rounded-2xl">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-800 block">Delivery Address</span>
                      <span className="line-clamp-2">{order.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-800 block">Payment</span>
                      <span>{order.paymentMethod || "Cash on Delivery"}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-gray-400 block font-semibold uppercase">
                      Total Paid
                    </span>
                    <span className="text-xl font-black text-orange-600">
                      ${Number(order.totalAmount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
