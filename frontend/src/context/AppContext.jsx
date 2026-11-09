import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem("dineease_admin");
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch {
      return null;
    }
  });

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState({ items: [] });
  const [totalPrice, setTotalPrice] = useState(0);

  // Sync admin state to localStorage
  const handleSetAdmin = (adminData) => {
    if (adminData) {
      localStorage.setItem("dineease_admin", JSON.stringify(adminData));
      setAdmin(adminData);
    } else {
      localStorage.removeItem("dineease_admin");
      setAdmin(null);
    }
  };

  const fetchCartData = async () => {
    try {
      const { data } = await axios.get("/api/cart/get");
      if (data.success && data.cart) {
        setCart(data.cart);
      } else {
        setCart({ items: [] });
      }
    } catch (error) {
      // If not logged in, user just has an empty cart
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    if (cart?.items && Array.isArray(cart.items)) {
      const total = cart.items.reduce((sum, item) => {
        if (!item || !item.menuItem) return sum;
        return sum + (item.menuItem.price || 0) * (item.quantity || 1);
      }, 0);
      setTotalPrice(Number(total.toFixed(2)));
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + (item?.quantity || 0), 0) || 0;

  // Add to Cart
  const addToCart = async (menuId, quantity = 1) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity,
      });
      if (data.success) {
        toast.success(data.message || "Added to cart!");
        if (data.cart) {
          setCart(data.cart);
        } else {
          fetchCartData();
        }
      } else {
        toast.error(data.message || "Could not add to cart");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Please log in to add items to your cart";
      toast.error(msg);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  // Remove from Cart
  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        toast.success(data.message || "Item removed");
        if (data.cart) {
          setCart(data.cart);
        } else {
          fetchCartData();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Could not remove item from cart");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.warn("Error fetching categories:", error.message);
    }
  };

  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success && data.menuItems) {
        setMenus(data.menuItems);
      }
    } catch (error) {
      console.warn("Error fetching menus:", error.message);
    }
  };

  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        setCart({ items: [] });
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      setUser(null);
      navigate("/");
    }
  };

  useEffect(() => {
    isAuth();
    fetchCategories();
    fetchMenus();
    fetchCartData();
  }, []);

  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    admin,
    setAdmin: handleSetAdmin,
    categories,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    removeFromCart,
    cartCount,
    cart,
    setCart,
    totalPrice,
    fetchCartData,
    isAuth,
    logout,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
