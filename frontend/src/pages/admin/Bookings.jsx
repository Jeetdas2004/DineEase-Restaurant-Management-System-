import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { Calendar, Clock, Users, Phone, CheckCircle2, XCircle, Search } from "lucide-react";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/bookings");
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.warn("Error fetching bookings:", error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/booking/update-status/${bookingId}`,
        {
          status: newStatus,
        }
      );

      if (data.success) {
        toast.success(data.message || "Status updated");
        fetchBookings(); // FIXED: previously called fecthOrders() which caused ReferenceError!
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update booking status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchBookings();
    }
  }, [admin]);

  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Table Reservations
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Manage table seating, guest arrivals, and status updates
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {["All", "Pending", "Approved", "Cancelled"].map((st) => (
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

      {/* Bookings Card List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 font-medium text-sm">
              No reservations found under "{filter}".
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/80 text-gray-400 uppercase tracking-wider text-[11px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6">Guest Name</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Party Size</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6">Special Requests</th>
                  <th className="py-4 px-6">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-orange-50/20 transition">
                    <td className="py-4 px-6 font-bold text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {item.phone}
                    </td>
                    <td className="py-4 px-6 font-semibold">
                      {item.numberOfPeople} Guests
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">{item.date}</div>
                      <div className="text-gray-400 text-xs">{item.time}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-500 italic max-w-xs truncate">
                      {item.note || "None"}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        name="status"
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        disabled={loading}
                        className={`text-xs font-bold rounded-xl px-3 py-1.5 border focus:outline-none cursor-pointer ${
                          item.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "Cancelled"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
