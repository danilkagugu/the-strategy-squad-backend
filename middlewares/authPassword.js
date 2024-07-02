// import jwt from "jsonwebtoken";
// import HttpError from "../helpers/HttpError.js";
// import User from "../models/user.js";

// const authenticatePasswordUpdating = (req, res, next) => {
//   const { token } = req.body;

//   // if (!token) {
//   //   throw HttpError(401, "not authorization 1");
//   // }

//   // const [bearer, token] = authorization.split(" ", 2);
//   // console.log(token);

//   if (
//     // bearer !== "Bearer" ||
//     !token
//   ) {
//     throw HttpError(401, "invalid token 2");
//   }

//   jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
//     if (err) next(HttpError(401, "invalid token 3"));

//     try {
//       const user = await User.findById(decode.id);

//       if (!user || user.tokenTmp !== token) {
//         throw HttpError(401, "not authorized");
//       }

//       req.user = { id: decode.id };

//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
// };

// // const authenticatePasswordUpdating = async (req, res, next) => {
// //   try {
// //     const { authorization } = req.headers;

// //     if (!authorization) {
// //       throw HttpError(401, "not authorization 1");
// //     }

// //     const [bearer, token] = authorization.split(" ", 2);

// //     if (bearer !== "Bearer" || !token) {
// //       throw HttpError(401, "not authorization 2");
// //     }

// //     const { id } = jwt.verify(token, process.env.SECRET_KEY);

// //     if (!id) {
// //       throw HttpError(401, "not authorization 3");
// //     }

// //     const user = await User.findById(id);

// //     if (!user || user.tokenTmp !== token) {
// //       throw HttpError(401, "not authorization 4");
// //     }

// //     await User.findByIdAndUpdate(user._id, { tokenTmp: null });

// //     req.user = user;

// //     next();
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// export default authenticatePasswordUpdating;
