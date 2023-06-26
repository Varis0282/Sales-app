const express = require("express");
const { mongoose } = require("mongoose");
const router = express.Router();
const UserModel = mongoose.model("UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_KEY } = require("../config");

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res.status(400).json({ message: "Email already exists" });
      }
      bcrypt
        .hash(password, 16)
        .then((hashedPassword) => {
          const newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
          });
          newUser
            .save()
            .then((user) => {
              res.status(201).json({ message: "User created successfully" });
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!password || !email)
    return res.status(401).json({ message: "Please enter all fields" });
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      bcrypt
        .compare(password, userInDB.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: userInDB._id }, JWT_KEY);
            const userInfo = {
              id: userInDB._id,
              firstName: userInDB.firstName,
              lastName: userInDB.lastName,
              email: userInDB.email,
            };
            res.status(200).json({
              message: "Login Successful",
              token: token,
              user: userInfo,
            });
          } else
            return res.status(401).json({ message: "Invalid Credentials" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
