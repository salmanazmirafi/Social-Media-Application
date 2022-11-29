import bcrypt from "bcrypt";
import jwt from "bcrypt";
import User from "../moduls/UserModuls.js";
/** register user **/
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const hasPw = await bcrypt.hash(password, salt);
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hasPw,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const saveUser = await newUser.save();
    res.status(201).json({
      message: "Create User Success",
      saveUser,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
