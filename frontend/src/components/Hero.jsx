import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ArrowRight, Sparkles, Star, Award, Clock, Users } from "lucide-react";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-center bg-cover overflow-hidden">
      {/* Background with subtle zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')",
        }}
      ></div>

      {/* Multi-layered dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
        {/* Ambient Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Award-Winning Dining & Culinary Craft</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]">
          A Symphony of <br />
          <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Exceptional Flavors
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          From farm-fresh seasonal ingredients to wood-fired artisan delights,
          savor an unforgettable dining experience crafted for every occasion.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => navigate("/menu")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-base"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("/book-table")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white/60 font-semibold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-base"
          >
            <span>Reserve a Table</span>
          </button>
        </div>

        {/* Social Proof / Stats Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
              <Star className="w-4 h-4 fill-orange-400" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-white leading-none">4.9 / 5.0</p>
              <p className="text-[11px] text-gray-400">Google Reviews</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-white leading-none">Michelin Star</p>
              <p className="text-[11px] text-gray-400">Recommended 2026</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-white leading-none">30 Mins</p>
              <p className="text-[11px] text-gray-400">Fresh Delivery</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-white leading-none">50k+ Happy</p>
              <p className="text-[11px] text-gray-400">Guests Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
