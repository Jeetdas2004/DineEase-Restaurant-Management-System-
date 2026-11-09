import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { address, paymentMethod = "Cash on Delivery" } = req.body;
    if (!address || !address.trim()) {
      return res
        .status(400)
        .json({ message: "Delivery address is required", success: false });
    }

    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty", success: false });
    }

    // Filter out invalid items
    const validItems = cart.items.filter((item) => item.menuItem != null);
    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid items in cart", success: false });
    }

    const totalAmount = validItems.reduce(
      (sum, item) => sum + (item.menuItem.price || 0) * item.quantity,
      0
    );

    const newOrder = await Order.create({
      user: id,
      items: validItems.map((i) => ({
        menuItem: i.menuItem._id,
        quantity: i.quantity,
      })),
      totalAmount: Number(totalAmount.toFixed(2)),
      address: address.trim(),
      paymentMethod,
    });

    // Clear user cart
    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(newOrder._id).populate("items.menuItem");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id })
      .populate("items.menuItem")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error("Error in getUserOrders:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuItem")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found", success: false });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", success: true, order });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
