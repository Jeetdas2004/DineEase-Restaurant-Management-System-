import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload, Plus, Package } from "lucide-react";
import toast from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories, fetchMenus } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: categories[0]?._id || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      toast.error("Please fill in all dish details");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!file) {
      toast.error("Please upload a photo of the dish");
      return;
    }

    try {
      setLoading(true);
      // FIXED: Use standard FormData for file uploads
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name.trim());
      dataToSend.append("price", formData.price);
      dataToSend.append("description", formData.description.trim());
      dataToSend.append("category", formData.category);
      dataToSend.append("image", file);

      const { data } = await axios.post("/api/menu/add", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message || "Menu item added successfully!");
        fetchMenus();
        navigate("/admin/menus");
      } else {
        toast.error(data.message || "Failed to add menu item");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add New Dish to Menu</h1>
            <p className="text-xs text-gray-400">
              Add a new culinary item with pricing and photos
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dish Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Dish Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
              placeholder="e.g. Truffle Mushroom Risotto"
            />
          </div>

          {/* Category & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Price ($ USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                placeholder="e.g. 18.50"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Description & Key Ingredients *
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
              placeholder="Describe flavors, cooking method, ingredients, allergens..."
            ></textarea>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Dish Image *
            </label>
            <input
              type="file"
              id="menuImage"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <label
              htmlFor="menuImage"
              className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-3xl cursor-pointer bg-gray-50/60 hover:bg-orange-50/20 transition p-4 text-center"
            >
              {preview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-2xl shadow-md"
                  />
                  <span className="text-xs font-bold text-orange-600">
                    Change Image ({file?.name})
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    Click to browse and upload dish photo
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP up to 10MB
                  </span>
                </div>
              )}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 rounded-full shadow-lg shadow-orange-500/25 transition cursor-pointer text-sm disabled:opacity-60"
          >
            <Plus className="w-4 h-4" />
            <span>{loading ? "Adding Dish..." : "Publish Menu Item"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
