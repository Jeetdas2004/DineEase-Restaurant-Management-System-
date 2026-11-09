import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice, navigate, removeFromCart, addToCart } =
    useContext(AppContext);

  const validItems =
    cart?.items?.filter((item) => item && item.menuItem) || [];

  if (validItems.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-gray-50/50 px-4 py-16">
        <div className="text-center max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-orange-100/70 text-orange-500 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Looks like you haven't added any culinary favorites yet. Check out our menu for mouth-watering dishes!
          </p>
          <button
            onClick={() => navigate("/menu")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const deliveryFee = 0; // Free delivery
  const tax = Number((totalPrice * 0.08).toFixed(2));
  const finalTotal = Number((totalPrice + tax + deliveryFee).toFixed(2));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/20 via-white to-gray-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Shopping <span className="text-orange-500">Cart</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review your delicious selection before checking out
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-100 p-2 sm:p-4">
              {validItems.map((item) => {
                const menuItem = item.menuItem;
                const itemTotal = (menuItem.price * item.quantity).toFixed(2);

                return (
                  <div
                    key={item._id || menuItem._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 hover:bg-orange-50/20 rounded-2xl transition"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="w-20 h-20 rounded-2xl object-cover bg-gray-100 shadow-sm shrink-0"
                      />
                      <div>
                        <h3
                          onClick={() => navigate(`/menu-details/${menuItem._id}`)}
                          className="font-bold text-gray-900 hover:text-orange-600 transition cursor-pointer text-base line-clamp-1"
                        >
                          {menuItem.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          ${Number(menuItem.price).toFixed(2)} per serving
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              addToCart(menuItem._id, -1);
                            } else {
                              removeFromCart(menuItem._id);
                            }
                          }}
                          className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm text-gray-800 px-3">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(menuItem._id, 1)}
                          className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-black text-gray-900 text-base min-w-[70px] text-right">
                        ${itemTotal}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(menuItem._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Sidebar (1 col) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({validItems.length} items)</span>
                  <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 items-center">
                  <span>Delivery Fee</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-orange-600">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-base"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-4">
                🔒 Safe & encrypted checkout guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
