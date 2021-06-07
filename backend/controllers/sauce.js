const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createThing = (req, res, next) => {
  console.log(req.body.sauce);
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const thing = new Sauce({
    ...sauceObject,

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  thing
    .save()
    .then(() => res.status(201).json({
      message: "product create !"
    }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({error})});
      
};


exports.getOneThing = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id,
    })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyThing = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
  } : {
    ...req.body
  };
  Sauce.updateOne({
      _id: req.params.id
    }, {
      ...sauceObject,
      _id: req.params.id
    })
    .then(() => res.status(200).json({
      message: "product uptdate !"
    }))
    .catch((error) => res.status(400).json({
      error
    }));
};

exports.deleteThing = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id
    })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: "product delete !"
          }))
          .catch((error) => res.status(400).json({
            error
          }));
      });
    })
    .catch((error) => res.status(500).json({
      error
    }));
};

exports.getAllStuff = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};