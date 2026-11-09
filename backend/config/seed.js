import Category from "../models/categoryModel.js";
import Menu from "../models/menuModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Booking from "../models/bookingModel.js";
import bcrypt from "bcryptjs";

export const seedInitialData = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount > 0) {
      console.log("Database already contains data, skipping seed.");
      return;
    }

    console.log("Seeding initial restaurant data...");

    // 1. Seed Categories
    const categoriesData = [
      {
        name: "Burgers & Sandwiches",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Artisan Pizzas",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Pasta & Risotto",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Steaks & Grills",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Salads & Bowls",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
      },
      {
        name: "Desserts & Shakes",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    const catMap = {};
    createdCategories.forEach((c) => {
      catMap[c.name] = c._id;
    });

    // 2. Seed Menus
    const menuData = [
      {
        name: "Truffle Mushroom Burger",
        description: "Gourmet beef patty with melted aged swiss cheese, sautéed wild mushrooms, and black truffle aioli on toasted brioche.",
        price: 16.99,
        category: catMap["Burgers & Sandwiches"],
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Smoky Hickory BBQ Bacon Burger",
        description: "Double Angus beef, crispy smoked bacon, aged cheddar, beer-battered onion ring, and house hickory BBQ sauce.",
        price: 15.49,
        category: catMap["Burgers & Sandwiches"],
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Classic Margherita D.O.P.",
        description: "San Marzano plum tomatoes, fresh buffalo mozzarella, aromatic basil leaves, and cold-pressed extra virgin olive oil.",
        price: 14.99,
        category: catMap["Artisan Pizzas"],
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Spicy Diavola Pepperoni Pizza",
        description: "Crispy wood-fired dough topped with spicy Calabrian pepperoni, smoked provolone, chili flakes, and hot wildflower honey.",
        price: 17.99,
        category: catMap["Artisan Pizzas"],
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Creamy Fettuccine Alfredo",
        description: "Handcrafted egg fettuccine tossed in rich 24-month aged parmesan cream, roasted garlic butter, and cracked black pepper.",
        price: 16.5,
        category: catMap["Pasta & Risotto"],
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Wild Porcini Truffle Risotto",
        description: "Slow-simmered arborio rice with foraged porcini mushrooms, white wine reduction, parmesan crisps, and herb oil.",
        price: 18.99,
        category: catMap["Pasta & Risotto"],
        image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Prime Ribeye Steak (12oz)",
        description: "USDA Prime grilled ribeye basted in rosemary-garlic butter, paired with roasted baby potatoes and grilled asparagus.",
        price: 28.99,
        category: catMap["Steaks & Grills"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Smoked Honey Chipotle Ribs",
        description: "Slow-smoked baby back ribs glazed in honey-chipotle BBQ glaze, served with seasoned steakhouse fries and coleslaw.",
        price: 24.5,
        category: catMap["Steaks & Grills"],
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Mediterranean Avocado Quinoa Bowl",
        description: "Organic baby greens, fluffy quinoa, ripe Hass avocado, heirloom cherry tomatoes, kalamata olives, and lemon-herb dressing.",
        price: 13.99,
        category: catMap["Salads & Bowls"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Warm Belgian Chocolate Lava Cake",
        description: "Decadent dark chocolate molten cake with a warm flowing center, served with Madagascan vanilla bean gelato.",
        price: 9.99,
        category: catMap["Desserts & Shakes"],
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Salted Caramel Biscoff Milkshake",
        description: "Thick handcrafted milkshake with crumbled Lotus Biscoff, swirls of sea-salted caramel, whipped cream, and chocolate curls.",
        price: 7.99,
        category: catMap["Desserts & Shakes"],
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
      {
        name: "Crispy Calamari Fritti",
        description: "Golden tender calamari rings tossed with sea salt and fresh herbs, served with spicy marinara and lemon garlic aioli.",
        price: 12.99,
        category: catMap["Burgers & Sandwiches"],
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
      },
    ];

    const createdMenus = await Menu.insertMany(menuData);

    // 3. Seed Users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const demoUser = await User.create({
      name: "Alex Morgan",
      email: "customer@dineease.com",
      password: hashedPassword,
      isAdmin: false,
    });

    const adminHashed = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Restaurant Manager",
      email: process.env.ADMIN_EMAIL || "admin@dineease.com",
      password: adminHashed,
      isAdmin: true,
    });

    // 4. Seed Demo Bookings
    const today = new Date().toISOString().split("T")[0];
    await Booking.create({
      user: demoUser._id,
      name: "Alex Morgan",
      phone: "+1 (555) 234-5678",
      numberOfPeople: 4,
      date: today,
      time: "19:30",
      note: "Window table preferred for an anniversary celebration.",
      status: "Approved",
    });

    // 5. Seed Demo Order
    await Order.create({
      user: demoUser._id,
      items: [
        { menuItem: createdMenus[0]._id, quantity: 2 },
        { menuItem: createdMenus[2]._id, quantity: 1 },
      ],
      totalAmount: 16.99 * 2 + 14.99,
      address: "742 Evergreen Terrace, Springfield",
      paymentMethod: "Online Payment",
      status: "Preparing",
    });

    console.log("Seed data created successfully! Ready to serve customers.");
  } catch (error) {
    console.error("Error during seed:", error);
  }
};

