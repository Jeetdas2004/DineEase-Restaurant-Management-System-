import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { Package, Clock, MapPin, CreditCard, ChevronDown } from "lucide-react";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.warn("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success(data.message || "Order status updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchOrders();
    }
  }, [admin]);

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Customer Orders
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Manage incoming kitchen orders and track delivery fulfillment
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          {["All", "Pending", "Preparing", "Delivered"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === st
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
          <p className="text-gray-400 font-medium text-sm">No orders matching "{filter}".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                <div>
                  <span className="text-xs font-bold text-gray-400">
                    ORDER #{order._id.slice(-6).toUpperCase()}
                  </span>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    Customer: {order.user?.name || "Guest Customer"} ({order.user?.email || "No email"})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={loading}
                    className={`text-xs font-bold rounded-xl px-3 py-1.5 border focus:outline-none cursor-pointer ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : order.status === "Preparing"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Items in order */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {order.items?.map((item, idx) => {
                  const menuItem = item.menuItem;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-gray-50/70 p-2.5 rounded-2xl border border-gray-100 text-xs"
                    >
                      {menuItem?.image ? (
                        <img
                          src={menuItem.image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover bg-gray-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 truncate">
                          {menuItem?.name || "Dish item"}
                        </p>
                        <p className="text-gray-400">
                          Qty: {item.quantity} &bull; ${Number(menuItem?.price || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Meta details */}
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <strong>Address:</strong> {order.address}
                  </span>
                  <span>&bull;</span>
                  <span>
                    <strong>Payment:</strong> {order.paymentMethod}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Order Total: </span>
                  <span className="text-lg font-black text-orange-600">
                    ${Number(order.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
