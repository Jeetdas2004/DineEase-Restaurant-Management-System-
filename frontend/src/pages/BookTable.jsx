import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  Users,
  Utensils,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MessageSquare,
} from "lucide-react";

const BookTable = () => {
  const { axios, navigate, user } = useContext(AppContext);

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 2,
    date: today,
    time: "19:00",
    note: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ];

  const occasions = ["Romantic Dinner", "Birthday Celebration", "Anniversary", "Business Lunch", "Family Gathering"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const { data } = await axios.post("/api/booking/create", formData);
      if (data.success) {
        toast.success(data.message || "Table booked successfully!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Could not complete booking");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Please log in to book a table";
      toast.error(msg);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Exclusive Reservations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Reserve Your <span className="text-orange-500">Fine Dining</span> Table
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Enjoy prime seating, immaculate hospitality, and culinary excellence. Instant confirmation with zero booking fees.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                  />
                </div>
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Number of Guests *
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Reservation Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition cursor-pointer"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Reservation Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Quick Time Slots Pills */}
            <div>
              <span className="text-xs font-semibold text-gray-400 block mb-2">
                Popular Dining Slots:
              </span>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setFormData({ ...formData, time: slot })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      formData.time === slot
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Occasion Preset Pills */}
            <div>
              <span className="text-xs font-semibold text-gray-400 block mb-2">
                Occasion (Optional):
              </span>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occ) => (
                  <button
                    type="button"
                    key={occ}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        note: formData.note ? `${formData.note} - ${occ}` : occ,
                      })
                    }
                    className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 transition cursor-pointer"
                  >
                    + {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Special Requests & Dietary Requirements
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                <textarea
                  name="note"
                  rows={3}
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="e.g. High chair needed, window booth preferred, allergies, champagne on arrival..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-base disabled:opacity-60"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isSubmitting ? "Confirming Booking..." : "Confirm Table Reservation"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
