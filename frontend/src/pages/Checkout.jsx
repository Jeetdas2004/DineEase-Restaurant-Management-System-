import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

const Checkout = () => {
  const { totalPrice, cart, axios, navigate, setCart } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validItems = cart?.items?.filter((i) => i && i.menuItem) || [];
  const tax = Number((totalPrice * 0.08).toFixed(2));
  const finalTotal = Number((totalPrice + tax).toFixed(2));

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }
    if (validItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/menu");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post("/api/order/place", {
        address: address.trim(),
        paymentMethod,
      });

      if (data.success) {
        toast.success(data.message || "Order placed successfully!");
        setCart({ items: [] });
        navigate("/my-orders");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong while placing order";
      toast.error(msg);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/20 via-white to-gray-50/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Checkout & <span className="text-orange-500">Delivery</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Complete your order and we'll prepare your delicious meal right away
          </p>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Form (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                  <p className="text-xs text-gray-400">Where should we deliver your order?</p>
                </div>
              </div>

              <textarea
                rows={4}
                value={address}
                placeholder="Enter complete delivery address (Street, Apt/Suite, City, Landmark, Postal code)..."
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-400 focus:border-orange-500 focus:outline-none text-sm text-gray-800 placeholder-gray-400 transition"
              ></textarea>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Option</h2>
                  <p className="text-xs text-gray-400">Select how you prefer to pay</p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod("Cash on Delivery")}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                    paymentMethod === "Cash on Delivery"
                      ? "border-orange-500 bg-orange-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Cash on Delivery / Hotel</p>
                      <p className="text-xs text-gray-500">Pay cash or card when your meal arrives</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={() => setPaymentMethod("Cash on Delivery")}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod("Online Payment")}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                    paymentMethod === "Online Payment"
                      ? "border-orange-500 bg-orange-50/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Online Card / UPI Pay</p>
                      <p className="text-xs text-gray-500">Instant contactless & digital payment</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="Online Payment"
                    checked={paymentMethod === "Online Payment"}
                    onChange={() => setPaymentMethod("Online Payment")}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary (1 col) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-black text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <span>Review Order</span>
              </h2>

              {/* Items mini list */}
              <div className="max-h-56 overflow-y-auto divide-y divide-gray-100 mb-6 pr-1">
                {validItems.map((item) => (
                  <div key={item._id || item.menuItem._id} className="py-2.5 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 max-w-[170px]">
                      <span className="font-bold text-orange-600 shrink-0">{item.quantity}x</span>
                      <span className="text-gray-800 font-medium truncate">{item.menuItem.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price calculations */}
              <div className="space-y-3 text-sm border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 items-center">
                  <span>Delivery</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    FREE
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-black text-orange-600">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-base disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-4">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Secure & Guaranteed Fresh Delivery</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
