var express = require("express");
var router = express.Router();
var { readFile } = require("../plugins/fs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  readFile("./static/滕王阁序.txt")
    .then((read) => {
      res.send(read);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
