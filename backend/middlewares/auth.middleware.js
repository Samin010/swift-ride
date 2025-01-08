import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.model.js";
import { BlacklistTokenModel } from "../models/blacklist.token.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Token from cookies :", req.cookies.token);
    console.log(
      "Token from headers :",
      req.headers.authorization?.split(" ")[1]
    );
    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const isBlackListed = await BlacklistTokenModel.findOne({ token: token });
    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route", error.message);
  }
};
