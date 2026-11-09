import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ArrowRight, Utensils } from "lucide-react";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50/40 via-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Handcrafted Menu
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Explore Our <span className="text-orange-500">Categories</span>
            </h2>
            <p className="text-gray-500 mt-2 text-base max-w-xl">
              From gourmet wood-fired ovens to chilled desserts, discover authentic culinary creations designed for food lovers.
            </p>
          </div>

          <button
            onClick={() => navigate("/menu")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition group cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => navigate(`/menu?category=${encodeURIComponent(cat.name)}`)}
                className="group flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100/80 cursor-pointer text-center"
              >
                {/* Image Container with Glow */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 to-amber-300 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-orange-50 group-hover:border-orange-500 transition-colors duration-300 shadow-md">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-bold text-sm sm:text-base text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-xs text-gray-600 group-hover:text-orange-500 font-medium mt-1">
                  Explore dishes &rarr;
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <Utensils className="w-12 h-12 text-orange-400 mx-auto mb-3 animate-bounce" />
            <p className="text-gray-500 font-medium">Loading mouth-watering categories...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
