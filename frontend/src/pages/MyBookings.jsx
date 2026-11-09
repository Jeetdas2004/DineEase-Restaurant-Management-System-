import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Calendar, Clock, Users, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.warn("Could not fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
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
              My Table <span className="text-orange-500">Reservations</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Keep track of your upcoming and past dining experiences
            </p>
          </div>
          <Link
            to="/book-table"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-orange-500/20 transition"
          >
            <span>Book New Table</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500 text-sm">Loading your reservations...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Reservations Yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven't reserved any tables yet. Plan your next extraordinary dining night with us!
            </p>
            <Link
              to="/book-table"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md"
            >
              <span>Reserve a Table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gray-400">
                    ID: #{booking._id.slice(-6).toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Reservation for {booking.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>
                      <strong>Date:</strong> {booking.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>
                      <strong>Time:</strong> {booking.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>
                      <strong>Party Size:</strong> {booking.numberOfPeople} Guests
                    </span>
                  </div>
                </div>

                {booking.note && (
                  <p className="text-xs text-gray-500 italic mb-4 border-l-2 border-orange-300 pl-3">
                    "{booking.note}"
                  </p>
                )}

                <div className="text-[11px] text-gray-400 flex justify-between items-center pt-3 border-t border-gray-100">
                  <span>Reserved on {new Date(booking.createdAt).toLocaleDateString()}</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
