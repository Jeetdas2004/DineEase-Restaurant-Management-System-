import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email, and message");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for reaching out! Our concierge team will reply within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/20 via-white to-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Concierge & Guest Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Have questions about private dining, banquet catering, dietary accommodations, or special reservations? We'd love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Side (1 col) */}
          <div className="lg:col-span-1 space-y-4">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Our Location</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  742 Gourmet Boulevard, Suite 100<br />
                  Culinary Arts District, NY 10001
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Reservations & Inquiries</h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Direct Line: +1 (555) 234-5678<br />
                  VIP Line: +1 (555) 876-5432
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Email Concierge</h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  hospitality@dineease.com<br />
                  events@dineease.com
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Dining Hours</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Mon &ndash; Thu: 11:30 AM &ndash; 10:30 PM<br />
                  Fri &ndash; Sun: 11:00 AM &ndash; 11:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Form Side (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mb-6">
                Fill in the form below and our team will get back to you promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Rivera"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jordan@example.com"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Private Banquet / Event Booking"
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry, guest count, preferred dates..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/25 transition cursor-pointer text-sm disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending Message..." : "Submit Inquiry"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
