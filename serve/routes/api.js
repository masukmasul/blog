const express = require("express");
const router = express.Router();
const user = require("./user");
const post = require("./posts");
const categories = require("./categories");
const upload = require("./upload");
const private = require("./private");

router.use("/auth", user);
router.use("/private", private);

router.use("/post", post);
router.use("/categories", categories);
router.use("/upload", upload);

module.exports = router;
