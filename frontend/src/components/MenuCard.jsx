import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Plus, Check, Star } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart, cart } = useContext(AppContext);

  // Check if item is already in cart
  const itemInCart = cart?.items?.find(
    (item) => (item?.menuItem?._id || item?.menuItem) === menu._id
  );

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100/90 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Image Container */}
        <div
          onClick={() => navigate(`/menu-details/${menu._id}`)}
          className="relative h-56 sm:h-60 overflow-hidden cursor-pointer bg-gray-100"
        >
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Dark gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Availability Badge */}
          {!menu.isAvailable ? (
            <span className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
              Sold Out
            </span>
          ) : (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              Fresh Daily
            </span>
          )}

          {/* Category Tag if available */}
          {menu.category?.name && (
            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
              {menu.category.name}
            </span>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-gray-700">4.9</span>
            <span className="text-xs text-gray-600">(120+ reviews)</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => navigate(`/menu-details/${menu._id}`)}
            className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-orange-600 transition-colors cursor-pointer"
          >
            {menu.name}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 font-normal">
            {menu.description}
          </p>
        </div>
      </div>

      {/* Footer: Price & Add to Cart Action */}
      <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-600 block uppercase tracking-wider font-semibold">Price</span>
          <span className="text-2xl font-black text-gray-900">
            ${Number(menu.price).toFixed(2)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (menu.isAvailable) {
              addToCart(menu._id, 1);
            }
          }}
          disabled={!menu.isAvailable}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer ${
            !menu.isAvailable
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : itemInCart
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25"
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25 hover:scale-105 active:scale-95"
          }`}
        >
          {itemInCart ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added ({itemInCart.quantity})</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
