import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

const auth = (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ", 2);
  if (bearer !== "Bearer") next(HttpError(401, "invalid token"));

  jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
    if (err) next(HttpError(401, "invalid token"));

    try {
      const user = await User.findById(decode.id);
      if (!user) throw HttpError(401, "Not authorized");
      if (user.token !== token) throw HttpError(401, "Not authorized");
      req.user = { id: decode.id };
      next();
    } catch (error) {
      next(error);
    }
  });
};

export default auth;
