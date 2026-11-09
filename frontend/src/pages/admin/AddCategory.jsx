import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload, Plus, Layers, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading, fetchCategories } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please provide a category name");
      return;
    }
    if (!file) {
      toast.error("Please upload a category photo");
      return;
    }

    try {
      setLoading(true);
      // FIXED: Use standard FormData for multipart/form-data upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", name.trim());
      formDataToSend.append("image", file);

      const { data } = await axios.post("/api/category/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message || "Category created successfully!");
        fetchCategories();
        navigate("/admin/categories");
      } else {
        toast.error(data.message || "Could not add category");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add Menu Category</h1>
            <p className="text-xs text-gray-400">
              Create a new category to group and organize menu items
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
              placeholder="e.g. Wood-Fired Pizzas, Signature Cocktails"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Category Thumbnail Image *
            </label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              required
            />
            <label
              htmlFor="categoryImage"
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
                    Click to browse and upload image
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
            <span>{loading ? "Adding Category..." : "Publish Category"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
