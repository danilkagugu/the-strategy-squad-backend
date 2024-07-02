import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { authSchema, loginSchema } from "../schemas/authSchema.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { sendMail } from "../helpers/sendMail.js";

const { SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL } = process.env;

export const register = async (req, res, next) => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { email, password, repeatPassword } = req.body;

    const user = await User.findOne({ email });
    if (user) throw HttpError(409, "Email in use");

    if (password !== repeatPassword)
      throw HttpError(400, "Password is not correct");

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, "Email or password is wrong");

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw HttpError(401, "Email or password is wrong");

    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      REFRESH_SECRET_KEY,
      { expiresIn: "23h" }
    );

    await User.findByIdAndUpdate(
      user._id,
      { token, refreshToken },
      { new: true }
    );

    res.json({
      token,
      refreshToken,
      user: {
        email: user.email,
        name: user.name,
        gender: user.gender,
        waterNorm: user.waterNorm,
        weight: user.weight,
        timeActive: user.timeActive,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }, { new: true });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      REFRESH_SECRET_KEY,
      { expiresIn: "23h" }
    );

    await User.findByIdAndUpdate(
      user._id,
      { token, refreshToken },
      { new: true }
    );

    res.status(200).json({
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const sendPasswordEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "Invalid email");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    await User.findByIdAndUpdate(user._id, { tokenTmp: token });

    const urlToPasswordPage = `${FRONTEND_URL}/reset-password?token=${token}`;

    const subject = "Password reset";

    const html = `<p>Hello! <br /> Follow this <a href="${urlToPasswordPage}"><b>link</b></a> to reset your password for AQUATRACK<br />If you didn't ask to reset your password, you can ignore this email.</p>`;

    await sendMail({ to: email, html: html, subject: subject });

    res.send({ message: "check your email to update password" });
  } catch (error) {
    next(error);
  }
};

export const updateNewPassword = async (req, res, next) => {
  const { token, password } = req.body;

  if (!token) {
    throw HttpError(401, "invalid token 2");
  }
  jwt.verify(token, SECRET_KEY, async (err, decode) => {
    if (err) next(HttpError(401, "invalid token 3"));
    try {
      const user = await User.findById(decode.id);

      if (!user || user.tokenTmp !== token) {
        throw HttpError(401, "not authorized");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      await User.findByIdAndUpdate(decode.id, {
        password: hashPassword,
        tokenTmp: null,
      });

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });
};
