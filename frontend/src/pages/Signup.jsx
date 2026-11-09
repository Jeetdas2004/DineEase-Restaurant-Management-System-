import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon, User2Icon, Eye, EyeOff, UtensilsCrossed } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { navigate, axios, loading, setLoading, setUser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/register", formData);
      if (data.success) {
        toast.success(data.message || "Registration successful! Welcome to DineEase.");
        if (data.user) {
          setUser(data.user);
          navigate("/");
        } else {
          navigate("/login");
        }
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50/30 via-white to-gray-50/50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange-500/25">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Join DineEase
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Create an account to book VIP tables and order online
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User2Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  name="name"
                  value={formData.name}
                  onChange={onChangeHandler}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="email"
                  placeholder="e.g. alex@example.com"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password (min 6 characters)"
                  name="password"
                  value={formData.password}
                  onChange={onChangeHandler}
                  required
                  minLength={6}
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm text-gray-800 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-full text-white font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-sm disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Free Account"}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-gray-500 text-xs text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-bold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
