const db = require("../config/connection");
const collections = require("../config/collections");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(userData) {
  try {
    if (!(userData.fName && userData.email && userData.password)) {
      return { success: false, message: "Required data is missing" };
    }
    const user = await db
      .get()
      .collection(collections.USER_COLLECTION)
      .findOne({ email: userData.email });
    if (user) {
      return { success: false, message: "User already registered!" };
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const data = await db
      .get()
      .collection(collections.USER_COLLECTION)
      .insertOne(userData);
    data.success = true;
    data.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
}

async function login(userData) {
  try {
    if (!(userData.email && userData.password)) {
      return { success: false, message: "Required data is missing" };
    }
    const user = await db
      .get()
      .collection(collections.USER_COLLECTION)
      .findOne({ email: userData.email });
    if (user) {
      const status = await bcrypt.compare(userData.password, user.password);
      if (status) {
        user.success = true;
        user.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        return user;
      }
    }
    return { success: false, message: "Invalid username or password" };
  } catch (error) {
    return { success: false, message: error };
  }
}

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = { register, login, authenticateToken };
