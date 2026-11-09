import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, numberOfPeople, date, time, note } = req.body;
    if (!name || !phone || !numberOfPeople || !date || !time) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check for overlapping active bookings at same date and time
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" },
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked. Please choose another time.", success: false });
    }

    const booking = await Booking.create({
      user: id,
      name: name.trim(),
      phone: phone.trim(),
      numberOfPeople: Number(numberOfPeople),
      date,
      time,
      note: note ? note.trim() : "",
      status: "Approved",
    });

    res
      .status(201)
      .json({ success: true, message: "Table booked successfully!", booking });
  } catch (error) {
    console.error("Error in createBooking:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.find({ user: id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.error("Error in getUserBookings:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.error("Error in getAllBookings:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found", success: false });

    booking.status = status;
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Booking status updated successfully", booking });
  } catch (error) {
    console.error("Error in updateBookingStatus:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
