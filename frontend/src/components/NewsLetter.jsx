import { useState } from "react";
import { Mail, Sparkles, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing! Check your inbox for exclusive dining perks.");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-20 px-4 sm:px-6 lg:px-8 border-y border-gray-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Culinary Club</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Receive Secret Recipes &amp; <br />
          <span className="text-orange-400">Special Dining Invitations</span>
        </h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto mb-8 font-light">
          Join 15,000+ gourmands who enjoy complimentary appetizers, chef tasting invites, and seasonal discounts.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-3xl max-w-md mx-auto backdrop-blur-md"
        >
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full bg-transparent pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition cursor-pointer"
          >
            <span>Subscribe</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-[11px] text-gray-500 mt-4">
          No spam, ever. Unsubscribe with one click anytime.
        </p>
      </div>
    </section>
  );
}
