const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const CryptoJS = require("crypto-js");

exports.signup = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "bad request" });
  }
  const email = CryptoJS.AES.encrypt(
    req.body.email,
    CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_TOKEN),
    {
      mode: CryptoJS.mode.ECB,
      iv: CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV),
    }
  ).toString();
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "bad request" });
  }
  const email = CryptoJS.AES.encrypt(
    req.body.email,
    CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET_TOKEN),
    {
      mode: CryptoJS.mode.ECB,
      iv: CryptoJS.enc.Utf8.parse(process.env.CRYPTO_IV),
    }
  ).toString();
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "identifiants incorrect !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(404).json({ error: "identifiants incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
              expiresIn: "120s",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
