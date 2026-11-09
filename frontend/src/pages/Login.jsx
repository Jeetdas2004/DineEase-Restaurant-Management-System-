import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon, Eye, EyeOff, UtensilsCrossed, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { navigate, loading, setLoading, axios, setUser } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fillDemoCustomer = () => {
    setFormData({
      email: "customer@dineease.com",
      password: "password123",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/login", formData);
      if (data.success) {
        setUser(data.user);
        toast.success(data.message || "Welcome back!");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
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
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to manage bookings, track orders & favorites
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <input
                  type="email"
                  placeholder="e.g. customer@dineease.com"
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
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={onChangeHandler}
                  required
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Quick Demo Fill Button */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold text-xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Click to auto-fill Demo Customer credentials</span>
            </button>
          </div>

          {/* Footer note */}
          <p className="text-gray-500 text-xs text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 font-bold hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
