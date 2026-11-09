import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X, SlidersHorizontal, UtensilsCrossed } from "lucide-react";
import MenuCard from "../components/MenuCard";
import { useSearchParams } from "react-router-dom";

const Menu = () => {
  const { menus, categories } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filteredMenus, setFilteredMenus] = useState([]);

  // Sync state if URL query param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...menus];

    // 1. Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((item) => {
        const catName = item.category?.name || item.category;
        return catName?.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredMenus(result);
  }, [searchQuery, selectedCategory, sortBy, menus]);

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    if (catName === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catName });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("default");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-100/70 px-4 py-1.5 rounded-full inline-block mb-3">
            Gourmet Selection
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Our Handcrafted <span className="text-orange-500">Menu</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            Discover culinary masterpieces prepared by our passionate chefs. Fresh ingredients, authentic recipes, and extraordinary flavor in every bite.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dish by name, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-sm text-gray-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                <span>Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="default">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategorySelect("All")}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              All Items ({menus.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategorySelect(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredMenus.length}</span> dishes
            {selectedCategory !== "All" && (
              <span> in <strong className="text-orange-600">{selectedCategory}</strong></span>
            )}
            {searchQuery && (
              <span> matching "<strong className="text-gray-800">{searchQuery}</strong>"</span>
            )}
          </p>

          {(searchQuery || selectedCategory !== "All" || sortBy !== "default") && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Menus Grid */}
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenus.map((menu) => (
              <MenuCard menu={menu} key={menu._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No matching dishes found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              We couldn't find any dishes matching your current search or category filter.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-sm shadow-md shadow-orange-500/25 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
