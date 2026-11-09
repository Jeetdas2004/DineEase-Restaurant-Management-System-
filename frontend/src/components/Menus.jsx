import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
import { ArrowRight, Flame } from "lucide-react";

const Menus = () => {
  const { menus, navigate } = useContext(AppContext);
  // Feature top 8 popular dishes on Home page
  const featuredMenus = menus.slice(0, 8);

  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Chef's Signature Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Most Popular <span className="text-orange-500">Dishes</span>
            </h2>
            <p className="text-gray-500 mt-2 text-base max-w-xl">
              Handpicked by our executive culinary team, prepared to perfection with fresh premium ingredients.
            </p>
          </div>

          <button
            onClick={() => navigate("/menu")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-white hover:bg-orange-500 hover:text-white text-gray-800 border border-gray-200 hover:border-orange-500 font-bold px-6 py-3 rounded-full text-sm shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Explore All ({menus.length}) Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dishes Grid */}
        {featuredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredMenus.map((menu) => (
              <MenuCard key={menu._id} menu={menu} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Preparing delicious dishes...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menus;
