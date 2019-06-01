const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
console.log(SECRET);
module.exports.signUp = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      msg: "please add your name"
    });
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(400).json({
        msg: "Error"
      });
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user) {
          return res.status(400).json({
            msg: "User already exists"
          });
        }
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        }).then(user => {
          const token = jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email
            },
            SECRET
          );
          res.status(200).json({
            msg: "User signed up successfully",
            access_token: "Bearer " + token,
            userName: user.name
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({
          msg: "Error"
        });
      });
  });
};

module.exports.logIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(400).json({
        msg: "No user with this email"
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          msg: "Error"
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email
          },
          SECRET
        );
        return res.status(200).json({
          msg: "logged in successfully",
          access_token: "Bearer " + token
        });
      } else {
        return res.status(400).json({
          msg: "password is incorrect"
        });
      }
    });
  });
};
