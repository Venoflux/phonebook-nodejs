const express = require("express");

const router = express.Router();
const {
  createNumber,
  deleteNumber,
  getAllNumbers,
  updateNumber,
  getNumber,
} = require("../controllers/numbers");

router.route("/").post(createNumber).get(getAllNumbers);

router.route("/:id").get(getNumber).delete(deleteNumber).patch(updateNumber);

module.exports = router;
