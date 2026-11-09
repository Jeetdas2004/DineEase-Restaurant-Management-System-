import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  ArrowLeft,
  CheckCircle,
  Plus,
  Minus,
  ShoppingCart,
  XCircle,
  Star,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import MenuCard from "../components/MenuCard";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  // If menus hasn't loaded yet
  if (!menus || menus.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading culinary delight...</p>
        </div>
      </div>
    );
  }

  const menu = menus.find((item) => item._id === id);

  if (!menu) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Dish Not Found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            The gourmet creation you're looking for might have been retired from our seasonal menu.
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-sm shadow-md transition cursor-pointer"
          >
            Explore Active Menu
          </button>
        </div>
      </div>
    );
  }

  // Related items from same category
  const relatedItems = menus
    .filter(
      (item) =>
        item._id !== menu._id &&
        (item.category?._id === menu.category?._id || item.category === menu.category)
    )
    .slice(0, 4);

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-gray-50/50 py-8">
      {/* Back button breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => navigate("/menu")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Menu</span>
        </button>
      </div>

      {/* Main Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/90 overflow-hidden p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-gray-100">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover"
                />
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  {menu.isAvailable ? (
                    <div className="bg-emerald-600/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>Available Now</span>
                    </div>
                  ) : (
                    <div className="bg-red-600/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-lg">
                      <XCircle className="w-4 h-4" />
                      <span>Currently Sold Out</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category Pill & Rating */}
                <div className="flex items-center gap-3 mb-3">
                  {menu.category?.name && (
                    <span className="text-xs font-bold text-orange-600 bg-orange-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
                      {menu.category.name}
                    </span>
                  )}
                  <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.9</span>
                    <span className="text-gray-400 font-normal">(180+ reviews)</span>
                  </div>
                </div>

                {/* Dish Title */}
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
                  {menu.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-orange-600">
                    ${Number(menu.price).toFixed(2)}
                  </span>
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
                    Per Serving
                  </span>
                </div>

                {/* Description Box */}
                <div className="bg-gray-50/80 rounded-2xl p-5 mb-6 border border-gray-100">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">
                    Dish Description
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {menu.description}
                  </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="p-3 bg-orange-50/50 rounded-2xl border border-orange-100/60 text-center">
                    <Sparkles className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-800 block">Chef Crafted</span>
                    <span className="text-[10px] text-gray-400">Gourmet recipe</span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/60 text-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-800 block">Fresh Ingredients</span>
                    <span className="text-[10px] text-gray-400">100% Organic</span>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100/60 text-center">
                    <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-gray-800 block">Fast Prep</span>
                    <span className="text-[10px] text-gray-400">15-20 mins</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart action bar */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity picker */}
                <div className="flex items-center justify-between border-2 border-gray-200 rounded-full px-4 py-2 bg-gray-50">
                  <button
                    onClick={decrementQty}
                    className="p-1 rounded-full hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-base text-gray-900 px-4">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    className="p-1 rounded-full hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => addToCart(menu._id, quantity)}
                  disabled={!menu.isAvailable}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm sm:text-base shadow-lg transition-all cursor-pointer ${
                    menu.isAvailable
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    Add to Order &bull; ${(Number(menu.price) * quantity).toFixed(2)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Dishes */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">
              You Might Also Enjoy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <MenuCard key={item._id} menu={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDetails;
