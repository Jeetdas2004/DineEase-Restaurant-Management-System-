import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Trash2, Plus, Package } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);

  const deleteMenu = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from the menu?`)) {
      return;
    }
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.message || "Menu item deleted");
        fetchMenus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete dish");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Menu Catalog
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Manage live dishes, prices, and catalog items ({menus.length} total dishes)
          </p>
        </div>

        <Link
          to="/admin/add-menu"
          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-md shadow-orange-500/25 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </Link>
      </div>

      {/* Menus Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {menus.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-sm">No menu items found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/80 text-gray-400 uppercase tracking-wider text-[11px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6">Dish Details</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {menus.map((item) => (
                  <tr key={item._id} className="hover:bg-orange-50/20 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.image}
                          alt=""
                          className="w-14 h-14 rounded-2xl object-cover bg-gray-100 shadow-sm shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                          <p className="text-gray-400 text-xs line-clamp-1 max-w-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-black text-gray-900 text-base">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      {item.isAvailable ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold">
                          Available
                        </span>
                      ) : (
                        <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-full text-xs font-bold">
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => deleteMenu(item._id, item.name)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;
