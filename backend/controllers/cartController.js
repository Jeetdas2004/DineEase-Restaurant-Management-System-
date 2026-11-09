import Cart from "../models/cartModel.js";
import Menu from "../models/menuModel.js";

export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity = 1 } = req.body;
    const { id } = req.user;

    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found", success: false });
    }

    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    const existingItem = cart.items.find((item) => {
      const existingId = item.menuItem?._id ? item.menuItem._id.toString() : item.menuItem?.toString();
      return existingId === menuId.toString();
    });

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ menuItem: menuId, quantity: Number(quantity) });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate("items.menuItem");

    res.status(200).json({
      message: "Item added to cart",
      success: true,
      cart: populatedCart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    let cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart) {
      return res.status(200).json({ cart: { items: [] }, success: true });
    }

    // Filter out deleted menu items
    const validItems = cart.items.filter((item) => item.menuItem != null);
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    res.status(200).json({ cart, success: true });
  } catch (error) {
    console.error("Error in getCart:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuId } = req.params;

    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found", success: false });
    }

    cart.items = cart.items.filter((item) => {
      const itemMenuId = item.menuItem?._id ? item.menuItem._id.toString() : item.menuItem?.toString();
      return itemMenuId !== menuId.toString();
    });

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate("items.menuItem");

    res.status(200).json({
      message: "Item removed from cart",
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
