import User from "../models/user.js";
import { updateSchema } from "../schemas/authSchema.js";
import HttpError from "../helpers/HttpError.js";

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
    const { name, weight, gender, waterNorm, timeActive } = req.body;
    const avatar = req.files ? req.files.avatar[0].path : null;

    const updateData = {
      name: name,
      gender: gender,
      weight: weight,
      waterNorm: waterNorm,
      timeActive: timeActive,
      avatarURL: avatar,
    };
    console.log(updateData);

    const { error } = updateSchema.validate(updateData, {
      abortEarly: false,
    });

    if (typeof error !== "undefined") {
      throw HttpError(400, error.details[0].message);
    }

    // const updateData = {
    //   ...(name && { name }),
    //   ...(weight && { weight}),
    //   ...(gender && { gender }),
    //   ...(waterNorm && { waterNorm}),
    //   ...(timeActive && {timeActive}),
    //   ...(avatar && { avatarURL: avatar }),
    // };

    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
