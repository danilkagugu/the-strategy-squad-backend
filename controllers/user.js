import User from "../models/user.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const feedbackMessage = {
      id: user._id,
      email: user.email,
      name: user.name,
      waterNorm: user.waterNorm,
      weight: user.weight,
      timeActive: user.timeActive,
      avatarURL: user.avatarURL,
      gender: user.gender,
    };
    res.status(200).json(feedbackMessage).end();
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    res.send("updateUser");
  } catch (error) {
    next(error);
  }
};
