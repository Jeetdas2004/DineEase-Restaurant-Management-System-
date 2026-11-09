import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trash2, Plus, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  const deleteCategory = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      return;
    }
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.message || "Category deleted");
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Menu Categories
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Manage your food & drink classifications
          </p>
        </div>

        <Link
          to="/admin/add-category"
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md shadow-orange-500/25 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </Link>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
          <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No categories added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-gray-100 shadow-sm shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{cat.name}</h3>
                  <span className="text-[11px] text-gray-400">
                    Added {new Date(cat.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteCategory(cat._id, cat.name)}
                className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition cursor-pointer"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
