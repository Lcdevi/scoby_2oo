const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploader = require("../config/cloudinary");


router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch("/me", uploader.single("image"), (req, res, next) => {
  const updateValues = req.body;

  if(req.file) {
      updateValues.image = req.file.path;
  }

  User.findByIdAndUpdate(req.params.id, updateValues, {new: true} )
      .then(userDocument => {
          res.status(200).json(userDocument);
      })
      .catch(error => {
          res.status(200).json(error);
  })
})

module.exports = router;
