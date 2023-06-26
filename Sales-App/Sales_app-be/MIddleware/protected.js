const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "User not logged in !" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "User not logged in" , message:err});
    }
    const { _id } = payload;
    UserModel.findById(_id).then((dbUser) => {
      req.user = dbUser;
      next(); //goes to the next middleware or goes to the REST API
    });
  });
};
