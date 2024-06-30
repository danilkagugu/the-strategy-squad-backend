import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const refreshAuth = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(HttpError(401, "Refresh token is missing"));
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY,
    async (err, decode) => {
      if (err) next(HttpError(401, "invalid refreshToken"));

      try {
        const user = await User.findById(decode.id);
        if (!user) throw HttpError(401, "Not authorized");

        if (user.refreshToken !== refreshToken)
          throw HttpError(401, "Not authorized");

        req.user = { id: decode.id };

        next();
      } catch (error) {
        next(error);
      }
    }
  );
};

export default refreshAuth;
