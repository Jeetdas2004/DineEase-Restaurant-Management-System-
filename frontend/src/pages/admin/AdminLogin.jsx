import { useContext, useState } from "react";
import { LockIcon, MailIcon, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {
  const { navigate, loading, setLoading, axios, setAdmin } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fillAdminCredentials = () => {
    setFormData({
      email: "admin@dineease.com",
      password: "admin123",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/admin/login", formData);

      if (data.success) {
        setAdmin(data.admin);
        toast.success(data.message || "Admin access granted!");
        navigate("/admin");
      } else {
        toast.error(data.message || "Invalid admin credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid admin login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-8 sm:p-10 text-white">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Restricted management access for DineEase staff
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Staff Email
              </label>
              <div className="relative">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type="email"
                  placeholder="admin@dineease.com"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-800/80 border border-gray-700 focus:bg-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none text-sm text-white placeholder-gray-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Security Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  name="password"
                  value={formData.password}
                  onChange={onChangeHandler}
                  required
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-gray-800/80 border border-gray-700 focus:bg-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none text-sm text-white placeholder-gray-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-full text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-sm disabled:opacity-60"
            >
              {loading ? "Authenticating..." : "Enter Admin Workspace"}
            </button>
          </form>

          {/* Quick Demo Fill Button */}
          <div className="mt-6 pt-5 border-t border-gray-800 text-center">
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold text-xs border border-orange-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click to auto-fill Admin credentials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
