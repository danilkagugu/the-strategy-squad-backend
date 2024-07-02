import User from "../models/user.js";
import { updateSchema } from "../schemas/authSchema.js";
import HttpError from "../helpers/HttpError.js";
import cloudinary from "../cloudinary.js";
import * as fs from "node:fs/promises";

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

    let avatarURL = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });

      avatarURL = result.secure_url;

      await fs.unlink(req.file.path);
    }

    const updateData = {
      ...(name && { name }),
      ...(weight && { weight }),
      ...(gender && { gender }),
      ...(waterNorm && { waterNorm }),
      ...(timeActive && { timeActive }),
      ...(avatarURL && { avatarURL }),
    };

    const { error } = updateSchema.validate(updateData, {
      abortEarly: false,
    });

    if (typeof error !== "undefined") {
      throw HttpError(400, error.details[0].message);
    }

    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    const feedbackMessage = {
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      waterNorm: updatedUser.waterNorm,
      weight: updatedUser.weight,
      timeActive: updatedUser.timeActive,
      avatarURL: updatedUser.avatarURL,
      gender: updatedUser.gender,
    };
    res.status(200).json({
      message: "User updated successfully",
      user: feedbackMessage,
    });
  } catch (error) {
    next(error);
  }
};
