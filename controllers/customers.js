import User from "../models/user.js";

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find();

    res.json(customers.length);
  } catch (error) {
    next(error);
  }
};
