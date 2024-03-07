const express = require("express");
const router = express.Router();


router.get("/", function (req, res) {
  res.send("Catalog Home Page");
});

router.get("/objects", function (req, res) {
  res.send("List of all books");
});

// router.get("/object/:id", function (req, res) {
  // res.send("specific book");
// });

router.get("/object/create", function (req, res) {
  res.send("Form for new book");
});

router.get("/object/id/update", function (req, res) {
  res.send("Form to edit");
});

router.get("/object/id/delete", function (req, res) {
  res.send("Form to delete");
});












module.exports = router;
