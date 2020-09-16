const express = require("express");
const router = express.Router();
const EditContract = require("../models/EditContractModel");

router.get("/EditContract", function (req, res) {
  EditContract.find({})
    .then(function (created) {
      res.send(created);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ errors: err });
    });
});

router.post("/EditContract", function (req, res) {
  console.log(req.body);
  EditContract.create({ content: req.body.text })
    .then(function (created) {
      res.send(created);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ errors: err });
    });
});

module.exports = router;
